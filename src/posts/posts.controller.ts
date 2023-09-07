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
  HttpException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';
import { PostCreateError, PostsDto, PostsResponseDto } from './dto/postsDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller({
  path: 'posts',
  version: '1'
})
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

  @ApiOperation({ summary: 'Get Posts for user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [PostsResponseDto]
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: HttpException
  })
  @Get('user/:id')
  async getPostByUserId(@Param('id', ParseIntPipe) id: number): Promise<PostsResponseDto[] | HttpException> {
    return await this.postsService.getPostsUsersId(id);
  }

  @ApiOperation({ summary: 'Register Posts' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: PostsDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: PostCreateError
  })
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
