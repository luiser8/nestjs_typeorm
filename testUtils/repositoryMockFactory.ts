import { Repository } from "typeorm";

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    find: jest.fn(entity => entity),
    findOne: jest.fn(entity => entity),
}));

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};