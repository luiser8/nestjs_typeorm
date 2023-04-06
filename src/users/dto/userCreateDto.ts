import { Role } from "src/role/roles.entity";
export class UserCreateDto {
  userName: string;
  password: string;
  authStrategy: string;
  roles: Role;
}
