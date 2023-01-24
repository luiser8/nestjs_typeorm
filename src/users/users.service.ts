import { Injectable } from '@nestjs/common';
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

  public getUsers() {
    return this.userRepository.find();
  }

  public getUsersId(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  public createUser(users: UserCreateDto) {
    const newUsers = this.userRepository.create(users);
    return this.userRepository.save(newUsers);
  }

  public deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  public updateUser(id: number, user: UserUpdateDto) {
    return this.userRepository.update({ id }, user);
  }
}
