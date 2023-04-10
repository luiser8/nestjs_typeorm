import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/roles.entity';
import { RoleDto } from './dto/roleDto';

@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) { }

  public async getRoles() {
    return await this.roleRepository.find();
  }

  public async getRoleId(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  public async createRole(role: RoleDto) {
    const existsRole = await this.roleRepository.findOne({
      where: { name: role.name },
    });

    if (existsRole) {
      return new HttpException('Role already exists', HttpStatus.CONFLICT);
    }

    const newRole = this.roleRepository.create(role);
    return await this.roleRepository.save(newRole);
  }

  public async deleteRole(id: number) {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  public async updateRole(id: number, role: RoleDto) {
    const existsRole = await this.roleRepository.findOne({
      where: { id },
    });

    if (!existsRole) {
      return new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return await this.roleRepository.update({ id }, role);
  }
}
