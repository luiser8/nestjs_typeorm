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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';
import { PostCreateError, PostsCreateDto, PostsResponseDto } from './dto/postsCreateDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostsDeleteDto, PostsDeleteErrorDto } from './dto/postsDeleteDto';
import { PostUpdateError, PostsUpdateDto } from './dto/postsUpdateDto';

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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Register Posts' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: PostsCreateDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: PostCreateError
  })
  @Post()
  async createPost(@Body() newPost: PostsCreateDto) {
    return await this.postsService.createPost(newPost);
  }

  @ApiOperation({ summary: 'Deleted Posts' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: "Deleted",
    type: PostsDeleteDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: PostsDeleteErrorDto
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<PostsDeleteDto | PostsDeleteErrorDto> {
    return await this.postsService.deletePost(id);
  }

  @ApiOperation({ summary: 'Updates Posts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Updated",
    type: PostsUpdateDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: PostUpdateError
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newPost: PostsUpdateDto,
  ): Promise<PostsUpdateDto | PostUpdateError> {
    return await this.postsService.updatePost(id, newPost);
  }
}
