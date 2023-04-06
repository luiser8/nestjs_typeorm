import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/roles.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Users } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Users])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
