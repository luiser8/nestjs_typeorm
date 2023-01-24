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
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(): Promise<Users[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return this.userService.getUsersId(id);
  }

  @Post()
  createUser(@Body() newUser: UserCreateDto): Promise<Users> {
    return this.userService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: UserUpdateDto,
  ) {
    return this.userService.updateUser(id, newUser);
  }
}
