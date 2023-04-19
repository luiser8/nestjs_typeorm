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

  @ApiProperty({ description: 'Users is required', type: [String] })
  users: Users;
}
