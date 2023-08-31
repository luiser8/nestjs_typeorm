import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Role } from 'src/entities/roles.entity';
import { Profile } from 'src/entities/profile.entity';
import { Posts } from 'src/entities/posts.entity';
import { EmailService } from 'src/email/email.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Role, Profile, Posts])],
    controllers: [AuthController],
    providers: [AuthService, EmailService],
})
export class AuthModule { }
