import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  id?: number;

  @ApiProperty({ description: 'Name is required', example: "Admin", type: [String] })
  name: string;
}
