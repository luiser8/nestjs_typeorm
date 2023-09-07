import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserCreateDto, UserCreateError } from './dto/userCreateDto';
import { UserUpdateDto } from './dto/userUpdateDto';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';
import { EmailService } from '../email/email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1'
})
export class UsersController {
  constructor (private userService: UsersService, private emailService: EmailService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.userService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUsersId(id);
  }

  @ApiOperation({ summary: 'Register Users' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: UserCreateDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: UserCreateError
  })
  @Post()
  async createUser(@Body() newUser: UserCreateDto) {
    const userCreated = await this.userService.createUser(newUser);
    try {
      await this.emailService.send(newUser.profile.email);
    } catch (error) {
      return error;
    }
    return userCreated;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, newUser);
  }
}
