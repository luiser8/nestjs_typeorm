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
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto, UserCreateError } from './dto/userCreateDto';
import { UserUpdateDto, UserUpdateErrorDto } from './dto/userUpdateDto';
import { Users } from '../entities/users.entity';
import { UsersService } from './users.service';
import { EmailService } from '../email/email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsService } from 'src/posts/posts.service';
import { PostsResponseDto } from 'src/posts/dto/postsCreateDto';
import { UserDeleteDto, UserDeleteErrorDto } from './dto/userDeleteDto';
import { ProfileService } from 'src/profile/profile.service';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1'
})
export class UsersController {
  constructor (private userService: UsersService, private emailService: EmailService, private postService: PostsService, private profileService: ProfileService) { }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<Users[]> {
    return await this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
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
    return await this.userService.createUser(newUser);
  }

  @ApiOperation({ summary: 'Delete Users' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Deleted",
    type: UserDeleteDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: UserDeleteErrorDto
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserDeleteDto | UserDeleteErrorDto> {
    const postsUser = await this.postService.getPostsUsersId(id) as PostsResponseDto[];
    if (postsUser.length > 1) {
      postsUser.forEach(x => {
        this.postService.deletePost(x.id);
      })
    }
    return await this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated",
    type: UserUpdateDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: UserUpdateErrorDto
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: UserUpdateDto,
  ): Promise<UserUpdateDto | UserUpdateErrorDto> {
    if (newUser.profile === undefined) {
      return await this.userService.updateUser(id, newUser);
    }
    await this.profileService.updateProfile(id, newUser.profile);
    return await this.userService.updateUser(id, newUser);
  }
}
