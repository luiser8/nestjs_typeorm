import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  id?: number;

  @ApiProperty({ description: 'Name Role is required', example: "Administrator", type: [String] })
  name: string;
}

export class RoleCreateError {
  @ApiProperty({ description: 'Error creating role', example: "true", type: [Boolean] })
  error: string;

  @ApiProperty({ description: 'Success creating role', example: "false", type: [Boolean] })
  success: string;

  @ApiProperty({ description: 'Success creating role', example: "Error", type: [String] })
  message: string;

  @ApiProperty({ description: '400', example: "400", type: [Number] })
  status: number;
}