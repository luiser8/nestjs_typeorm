import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { MockType, repositoryMockFactory } from '../../testUtils/repositoryMockFactory';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { allRoleMock, byIdRoleMock } from '../../testUtils/role.mock';

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
    });

    it('should return Roles with id', async () => {
        const result = await service.getRoleId(2);
        expect(result).toEqual(byIdRoleMock);
    });
});
