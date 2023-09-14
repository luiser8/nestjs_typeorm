import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { Role } from 'src/entities/roles.entity';
import { Profile } from 'src/entities/profile.entity';
import { Posts } from 'src/entities/posts.entity';
import { EmailService } from 'src/email/email.service';
import { PostsService } from 'src/posts/posts.service';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Role, Profile, Posts])],
  controllers: [UsersController],
  providers: [UsersService, EmailService, PostsService, ProfileService],
})
export class UsersModule { }
