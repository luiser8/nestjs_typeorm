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
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '../entities/roles.entity';
import { RoleCreateError, RoleDto } from './dto/roleDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Role')
@Controller({
  path: 'role',
  version: '1'
})
export class RoleController {
  constructor (private roleService: RoleService) { }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async getRole(): Promise<Role[]> {
    return await this.roleService.getRoles();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRoleById(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.getRoleId(id);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Register Role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Success",
    type: RoleDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Error",
    type: RoleCreateError
  })
  @Post()
  async createRole(@Body() newRole: RoleDto) {
    return await this.roleService.createRole(newRole);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.deleteRole(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: RoleDto,
  ) {
    return await this.roleService.updateRole(id, newUser);
  }
}
