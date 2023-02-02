import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/userCreateDto';
import { UserUpdateDto } from './dto/userUpdateDto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  public async getUsers() {
    return await this.userRepository.find();
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

    const newUsers = this.userRepository.create(users);
    return await this.userRepository.save(newUsers);
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
