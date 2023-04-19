import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto {
  id?: number;

  @ApiProperty({ description: 'FirstName is required', example: "Pedro", type: [String] })
  firstName: string;

  @ApiProperty({ description: 'LastName is required', example: "Diaz", type: [String] })
  lastName: string;

  @ApiProperty({ description: 'Email is required', example: "pedro@correo.com", type: [String] })
  email: string;
  photo?: string;
}
