import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { allRoleMock, byIdRoleMock, nullRoleMock, roleDtoMock } from '../../testUtils/role.mock';
import { Role } from "../entities/roles.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleDto } from "./dto/roleDto";

describe('RoleController', () => {
    let roleController: RoleController;
    let roleService: RoleService;

    beforeAll(async () => {
        const roleServiceProvider = {
            provide: RoleService,
            useFactory: () => ({
                getRoles: jest.fn(async () => Promise<Role[]>),
                getRoleId: jest.fn(async () => Promise<Role>),
                createRole: jest.fn(async () => RoleDto),
                deleteRole: jest.fn(async () => Promise.resolve()),
                updateRole: jest.fn(async () => Promise.resolve()),
            })
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleService, roleServiceProvider],
            controllers: [RoleController],
        }).compile();

        roleService = module.get<RoleService>(RoleService);
        roleController = module.get<RoleController>(RoleController);

    });

    test('if RoleController is defined', () => {
        expect(roleController).toBeDefined();
    });

    it('should return an array of roles', async () => {
        jest.spyOn(roleService, 'getRoles').mockImplementation().mockResolvedValue(allRoleMock);
        expect(await roleController.getRole()).toEqual(allRoleMock);
    });

    it('should return an array empty of roles', async () => {
        jest.spyOn(roleService, 'getRoles').mockImplementation().mockResolvedValue(nullRoleMock);
        expect(await roleController.getRole()).toEqual([]);
    });

    it('should return simple roles by id', async () => {
        jest.spyOn(roleService, 'getRoleId').mockImplementation().mockResolvedValue(byIdRoleMock);
        expect(await roleController.getRoleById(2)).toEqual(byIdRoleMock);
    });

    it('should create role', async () => {
        expect(await roleController.createRole(roleDtoMock)).not.toBeNull();
    });

    it('should delete role', async () => {
        expect(await roleController.deleteRole(3)).not.toBeNull();
    });

    it('should update role', async () => {
        expect(await roleController.updateRole(1, roleDtoMock)).not.toBeNull();
    });
});