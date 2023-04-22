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
import { RoleService } from './role.service';
import { Role } from '../entities/roles.entity';
import { RoleDto } from './dto/roleDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller({
  path: 'role',
  version: '1'
})
export class RoleController {
  constructor (private roleService: RoleService) { }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getRole(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.getRoleId(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(@Body() newRole: RoleDto) {
    return await this.roleService.createRole(newRole);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.deleteRole(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: RoleDto,
  ) {
    return await this.roleService.updateRole(id, newUser);
  }
}
