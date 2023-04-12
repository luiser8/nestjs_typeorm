import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { UserUpdateDto } from './dto/userUpdateDto';
import { Users } from '../entities/users.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserLoginDto } from './dto/userLoginDto';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {
  }

  public async getUsers() {
    const users = await this.userRepository.find({
      relations: ["roles", "profile", "posts"],
    });
    return users;
  }

  public async loginUsers(userLogin: UserLoginDto) {
    const user = await this.userRepository.findOne(
      {
        where:
          { userName: userLogin.userName, password: userLogin.password },
        relations: ["roles", "profile", "posts"],
      });
    if (user !== null) {
      return { userId: user.id, userName: user.userName, token: user.token, email: user.profile.email, role: user.roles.name };
    } else {
      return { error: "Error credentials" };
    }
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
        users.roles = { id: 2, name: "Invitado" };
      }

      user.roles = users.roles;
      user.userName = users.userName;
      user.authStrategy = "jwt";
      user.password = users.password;
      user.token = "hhgrhg7rhgrgkrmgmrlgmrlgmlrgh";

      const newProfile = this.profileRepository.create(users.profile);
      await this.profileRepository.save(newProfile);
      user.profile = newProfile;

      const newUsers = this.userRepository.create(user);
      return await this.userRepository.save(newUsers);
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async updateUser(id: number, user: UserUpdateDto) {
    const existsUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!existsUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.update({ id }, user);
  }
}
