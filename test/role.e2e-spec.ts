import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RoleModule } from '../src/role/role.module';
import { RoleService } from '../src/role/role.service';

describe('RoleController (e2e) ', () => {
    let app: INestApplication;
    let roleService: RoleService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [RoleModule],
        })
            .overrideProvider(RoleService)
            .useValue(roleService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET role`, () => {
        return request(app.getHttpServer())
            .get('/role')
            .expect(200)
            .expect({
                data: roleService.getRoles(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});