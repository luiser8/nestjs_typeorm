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
import { RoleService } from './role.service';
import { Role } from 'src/entities/roles.entity';
import { RoleDto } from './dto/roleDto';

@Controller('role')
export class RoleController {
  constructor (private roleService: RoleService) { }

  @Get()
  async getRole(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.getRoleId(id);
  }

  @Post()
  async createRole(@Body() newRole: RoleDto) {
    return await this.roleService.createRole(newRole);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.deleteRole(id);
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: RoleDto,
  ) {
    return await this.roleService.updateRole(id, newUser);
  }
}
