import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserCreateDto } from './dto/userCreateDto';
import { UserUpdateDto } from './dto/userUpdateDto';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/userLoginDto';

@Controller('users')
export class UsersController {
  constructor (private userService: UsersService) { }

  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUsersId(id);
  }

  @Post('login')
  async loginUser(@Body() loginUser: UserLoginDto) {
    return await this.userService.loginUsers(loginUser);
  }

  @Post()
  async createUser(@Body() newUser: UserCreateDto) {
    return await this.userService.createUser(newUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, newUser);
  }
}
