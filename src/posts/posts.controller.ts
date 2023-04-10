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
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';
import { PostsDto } from './dto/postsDto';

@Controller('posts')
export class PostsController {
  constructor (private postsService: PostsService) { }

  @Get()
  async getPosts(): Promise<Posts[]> {
    return await this.postsService.getPosts();
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostsId(id);
  }

  @Get('user/:id')
  async getPostByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostsUsersId(id);
  }

  @Post()
  async createPost(@Body() newPost: PostsDto) {
    return await this.postsService.createPost(newPost);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(id);
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newPost: PostsDto,
  ) {
    return await this.postsService.updatePost(id, newPost);
  }
}
