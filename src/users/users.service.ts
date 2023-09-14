import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { UserUpdateDto, UserUpdateErrorDto } from './dto/userUpdateDto';
import { Users } from '../entities/users.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserDeleteDto, UserDeleteErrorDto } from './dto/userDeleteDto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {
  }

  public async getUser(query: object) {
    const user = await this.userRepository.findOne(query);
    return user;
  }

  public async getUsers() {
    const users = await this.userRepository.find({
      relations: ["roles", "profile", "posts"],
    });
    return users;
  }

  public async getUsersId(id: number) {
    const users = await this.userRepository.findOne({ where: { id } });
    if (!users) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  public async createUser(users: UserCreateDto) {
    const existsUser = await this.userRepository.findOne({
      where: { userName: users.userName },
    });
    if (existsUser) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const existsUserEmail = await this.profileRepository.findOne({
      where: { email: users.profile.email },
    });
    if (existsUserEmail) {
      return new HttpException('User Email already exists', HttpStatus.CONFLICT);
    }

    try {
      const user = new Users();

      if (users?.roles === undefined) {
        users.roles = { id: 1, name: "Invitado" };
      }

      const passwordHash = await bcrypt.hash(users.password, 10);
      user.roles = users.roles;
      user.userName = users.userName;
      user.authStrategy = "jwt";
      user.password = passwordHash.toString();
      user.token = process.env.APP_TOKEN;

      const newProfile = this.profileRepository.create(users.profile);
      await this.profileRepository.save(newProfile);
      user.profile = newProfile;

      const newUsers = this.userRepository.create(user);
      await this.userRepository.save(newUsers);
      return { error: false, success: true, message: "Success", status: 201 };
    } catch (err) {
      console.log(err);
      return { error: true, success: false, message: err, status: 400 }
    }
  }

  public async deleteUser(id: number): Promise<UserDeleteDto | UserDeleteErrorDto> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        return { message: 'User delete not found', status: 400 };
      }
      return { message: 'Delete success', status: 202 };
    } catch (error) {
      return { message: 'User delete error', status: 400 };
    }
  }

  public async updateUser(id: number, user: UserUpdateDto): Promise<UserUpdateDto | UserUpdateErrorDto> {
    try {
      const existsUser = await this.userRepository.findOne({
        where: { id },
      });
      if (!existsUser) {
        return { message: 'User update not found', status: 400 };
      }
      if (user?.password !== undefined) {
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash.toString();
        await this.userRepository.update({ id }, { userName: user.userName, password: user.password });
      }
      return { message: 'User update success', status: 200 };
    } catch (err) {
      return { message: 'User update error', status: 400 };
    }
  }
}
