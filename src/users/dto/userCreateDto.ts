import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/entities/profile.entity";
import { Role } from "src/entities/roles.entity";

export class UserCreateDto {
  @ApiProperty({ description: 'UserName is required', example: "pedro.p", type: [String] })
  userName: string;

  @ApiProperty({ description: 'Password is required', example: "mypassword", type: [String] })
  password: string;

  authStrategy?: string;
  roles?: Role;

  @ApiProperty({ description: 'Profile is required', example: { "firstName": "myfirstName", "lastName": "mylastName", "email": "myemail" }, type: [String] })
  profile: Profile;
}

export class UserCreateError {
  @ApiProperty({ description: 'Error creating user account', example: "true", type: [Boolean] })
  error: string;

  @ApiProperty({ description: 'Success creating user account', example: "false", type: [Boolean] })
  success: string;

  @ApiProperty({ description: 'Success creating user account', example: "Error", type: [String] })
  message: string;

  @ApiProperty({ description: '400', example: "400", type: [Number] })
  status: number;
}