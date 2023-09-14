import { ApiProperty } from "@nestjs/swagger";

export class PostsUpdateDto {
    id?: number;

    @ApiProperty({ description: 'Title is required', example: "View nature", type: [String] })
    title: string;

    @ApiProperty({ description: 'Description is required', example: "View nature forever", type: [String] })
    description: string;

    @ApiProperty({ description: 'Type is required', example: "OCIO", type: [String] })
    type: string;
    createdAt?: Date;
}

export class PostUpdateError {
    @ApiProperty({ description: 'Success creating user account', example: "Error", type: [String] })
    message: string;

    @ApiProperty({ description: '400', example: "400", type: [Number] })
    status: number;
}

