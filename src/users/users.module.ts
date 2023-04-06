import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Role } from 'src/role/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
