import { ApiProperty } from "@nestjs/swagger";

export class PostsDeleteDto {
    @ApiProperty({ description: 'Delete success', type: [String] })
    message: string;

    @ApiProperty({ description: 'Accepted', example: "202", type: [Number] })
    status: number;
}

export class PostsDeleteErrorDto {
    @ApiProperty({ description: 'Posts delete not found', type: [String] })
    message: string;

    @ApiProperty({ description: 'Not found', example: "400", type: [Number] })
    status: number;
}