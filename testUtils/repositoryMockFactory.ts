import { Repository } from "typeorm";

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    find: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
    delete: jest.fn(entity => entity),
    update: jest.fn(entity => entity),
}));

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};