import { Users } from "src/entities/users.entity";

export class PostsDto {
  id?: number;
  title?: string;
  description?: string;
  type?: string;
  createdAt?: Date;
  users: Users;
}
