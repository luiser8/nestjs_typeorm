import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from 'src/entities/posts.entity';
import { PostsDto } from './dto/postsDto';

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

  public async getPostsUsersId(userId: number) {
    const posts = await this.postsRepository.find({ relations: ["users"] });
    const postForUser = posts.filter((post) => post.users.id === userId)?.map((post) => {
      return { id: post.id, title: post.title, description: post.description, type: post.type, createdAt: post.createdAt };
    })
    if (!posts || !postForUser) {
      return new HttpException('Post not found for user', HttpStatus.NOT_FOUND);
    }
    return postForUser;
  }

  public async createPost(post: PostsDto) {
    try {
      const posts = new Posts();
      posts.users = post.users;
      posts.title = post.title;
      posts.description = post.description;
      posts.type = post.type;

      const newPost = this.postsRepository.create(posts);
      return await this.postsRepository.save(newPost);
    } catch (error) {
      console.log(error);
    }
  }

  public async deletePost(id: number) {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async updatePost(id: number, post: PostsDto) {
    const existsPost = await this.postsRepository.findOne({
      where: { id },
    });

    if (!existsPost) {
      return new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return await this.postsRepository.update({ id }, post);
  }
}
