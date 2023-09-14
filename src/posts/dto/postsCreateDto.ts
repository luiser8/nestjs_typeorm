import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/entities/users.entity";

export class PostsCreateDto {
  id?: number;

  @ApiProperty({ description: 'Title is required', example: "View nature", type: [String] })
  title: string;

  @ApiProperty({ description: 'Description is required', example: "View nature forever", type: [String] })
  description: string;

  @ApiProperty({ description: 'Type is required', example: "OCIO", type: [String] })
  type: string;
  createdAt?: Date;

  @ApiProperty({ description: 'User Id is required', example: { "id": 1 }, type: [String] })
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

export class PostsResponseDto {
  @ApiProperty({ description: 'Id post', example: 1, type: [Number] })
  id: number;

  @ApiProperty({ description: 'Title the post', example: "View nature", type: [String] })
  title: string;

  @ApiProperty({ description: 'Description the post', example: "View nature forever", type: [String] })
  description: string;

  @ApiProperty({ description: 'Type the post', example: "OCIO", type: [String] })
  type: string;

  @ApiProperty({ description: 'Date creation the post', example: "09-09-2023", type: [Date] })
  createdAt: Date;
}
