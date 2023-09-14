import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/entities/profile.entity";
import { Role } from "src/entities/roles.entity";
export class UserUpdateDto {
  @ApiProperty({ description: 'UserName is required', example: "pedro.p", type: [String] })
  userName: string;

  @ApiProperty({ description: 'Password is required', example: "mypassword", type: [String] })
  password: string;
  authStrategy?: string;
  roles?: Role;

  @ApiProperty({ description: 'Profile is required', example: { "firstName": "myfirstName", "lastName": "mylastName", "email": "myemail" }, type: [String] })
  profile: Profile;
}

export class UserUpdateErrorDto {
  @ApiProperty({ description: 'User update not found', type: [String] })
  message: string;

  @ApiProperty({ description: 'Not found', example: "400", type: [Number] })
  status: number;
}