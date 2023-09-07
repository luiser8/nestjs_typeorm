import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/entities/users.entity";

export class PostsDto {
  id?: number;

  @ApiProperty({ description: 'Title is required', example: "View nature", type: [String] })
  title: string;

  @ApiProperty({ description: 'Description is required', example: "View nature forever", type: [String] })
  description: string;

  @ApiProperty({ description: 'UserName is required', example: "OCIO", type: [String] })
  type: string;
  createdAt?: Date;

  @ApiProperty({ description: 'Users is required', example: { "id": 1 }, type: [String] })
  users: Users;
}

export class PostCreateError {
  @ApiProperty({ description: 'Error creating user account', example: "true", type: [Boolean] })
  error: string;

  @ApiProperty({ description: 'Success creating user account', example: "false", type: [Boolean] })
  success: string;

  @ApiProperty({ description: 'Success creating user account', example: "Error", type: [String] })
  message: string;

  @ApiProperty({ description: '400', example: "400", type: [Number] })
  status: number;
}