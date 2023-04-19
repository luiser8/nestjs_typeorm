import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/entities/profile.entity";
import { Role } from "src/entities/roles.entity";
export class UserUpdateDto {
  @ApiProperty({ description: 'UserName is required', example: "pedro.p", type: [String] })
  userName: string;

  @ApiProperty({ description: 'Password is required', type: [String] })
  password: string;
  authStrategy?: string;
  roles?: Role;

  @ApiProperty({ description: 'Profile is required', type: [String] })
  profile: Profile;
}
