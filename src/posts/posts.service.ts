import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/posts.entity';
import { PostCreateError, PostsCreateDto, PostsCreateStatus, PostsResponseDto } from './dto/postsCreateDto';
import { PostsDeleteDto, PostsDeleteErrorDto } from './dto/postsDeleteDto';
import { PostUpdateError, PostsUpdateDto } from './dto/postsUpdateDto';

@Injectable()
export class PostsService {
  constructor (
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) { }

  public async getPosts() {
    return await this.postsRepository.find({
      relations: ["users"]
    });
  }

  public async getPostsId(id: number) {
    const posts = await this.postsRepository.findOne({ where: { id } });
    if (!posts) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return posts;
  }

  public async getPostsUsersId(userId: number): Promise<PostsResponseDto[] | HttpException> {
    const posts = await this.postsRepository.find({ relations: ["users"] });
    const postForUser = posts.filter((post) => post.users.id === userId)?.map((post) => {
      return { id: post.id, title: post.title, description: post.description, type: post.type, createdAt: post.createdAt };
    })
    if (!posts || !postForUser) {
      return new HttpException('Post not found for user', HttpStatus.NOT_FOUND);
    }
    return postForUser;
  }

  public async createPost(post: PostsCreateDto): Promise<PostsCreateStatus | PostCreateError> {
    try {
      const posts = new Posts();
      posts.users = post.users;
      posts.title = post.title;
      posts.description = post.description;
      posts.type = post.type;

      const newPost = this.postsRepository.create(posts);
      const request = await this.postsRepository.save(newPost);

      return {
        id: request.id,
        title: request.title,
        description: request.description,
        createdAt: request.createdAt,
        type: request.type,
        users: request.users,
        message: 'Post created',
        status: 201
      }
    } catch (error) {
      return {
        error: true,
        success: false,
        message: 'Post error',
        status: 400
      }
    }
  }

  public async deletePost(id: number): Promise<PostsDeleteDto | PostsDeleteErrorDto> {
    try {
      const result = await this.postsRepository.delete(id);
      if (result.affected === 0) {
        return { message: 'Delete error', status: 400 };
      }
      return { message: 'Delete success', status: 202 };
    } catch (error) {
      return { message: 'Posts delete error', status: 400 };
    }
  }

  public async updatePost(id: number, post: PostsUpdateDto): Promise<PostsUpdateDto | PostUpdateError> {
    try {
      const existsPost = await this.postsRepository.findOne({
        where: { id },
      });

      if (!existsPost) {
        return { message: 'Posts update error', status: 400 };
      }
      await this.postsRepository.update({ id }, post);
      return { message: 'Posts update success', status: 200 };
    } catch (error) {
      return { message: 'Posts update error', status: 400 };
    }
  }
}
