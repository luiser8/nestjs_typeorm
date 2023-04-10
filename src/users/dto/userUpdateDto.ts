import { Profile } from "src/entities/profile.entity";
import { Role } from "src/entities/roles.entity";
export class UserUpdateDto {
  userName: string;
  password: string;
  authStrategy: string;
  roles?: Role;
  profile: Profile;
}
