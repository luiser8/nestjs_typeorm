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
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';
import { PostsDto } from './dto/postsDto';

@Controller('posts')
export class PostsController {
  constructor (private postsService: PostsService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.postsService.getPosts();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostsId(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('user/:id')
  async getPostByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostsUsersId(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createPost(@Body() newPost: PostsDto) {
    return await this.postsService.createPost(newPost);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newPost: PostsDto,
  ) {
    return await this.postsService.updatePost(id, newPost);
  }
}
