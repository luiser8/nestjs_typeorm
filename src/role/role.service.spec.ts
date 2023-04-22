import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { MockType, repositoryMockFactory } from '../../testUtils/repositoryMockFactory';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { allRoleMock, byIdRoleMock, nullRoleMock, roleDtoMock } from '../../testUtils/role.mock';

describe('RoleService', () => {
    let service: RoleService;
    let repositoryMock: MockType<Repository<Role>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleService, { provide: getRepositoryToken(Role), useFactory: repositoryMockFactory }],
        }).compile();

        service = module.get<RoleService>(RoleService);
        repositoryMock = module.get(getRepositoryToken(Role));
        repositoryMock.find.mockReturnValue(allRoleMock);
        repositoryMock.findOne.mockReturnValue(byIdRoleMock);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all Roles', async () => {
        const result = await service.getRoles();
        expect(result).toEqual(allRoleMock);
        expect(result).not.toBeNull();
    });

    it('should return null Roles', async () => {
        repositoryMock.find.mockReturnValue(nullRoleMock);
        const result = await service.getRoles();
        expect(result).toEqual(nullRoleMock);
        expect(result).toHaveLength(0);
    });

    it('should return Roles with id', async () => {
        const result = await service.getRoleId(1);
        expect(result).toStrictEqual(byIdRoleMock);
        expect(result).not.toBeNull();
    });

    it('should create new Role', async () => {
        const result = await service.createRole(roleDtoMock);
        expect(result).not.toBeNull();
    });

    it('should delete Role', async () => {
        const result = await service.deleteRole(2);
        expect(result).not.toBeNull();
    });

    it('should update Role', async () => {
        const result = await service.updateRole(2, roleDtoMock);
        expect(result).not.toBeNull();
    });
});
