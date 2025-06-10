import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailBodyDto {
    @ApiProperty({ description: 'Email is required', example: "", type: [String] })
    @IsEmail()
    emailTo: string;

    @ApiProperty({ description: 'Subject is required', example: "", type: [String] })
    @IsString()
    subject: string;

    @ApiProperty({ description: 'Message body is required', example: "", type: [String] })
    @IsString()
    message: string;

    @ApiProperty({ description: 'HTML content is required', example: "", type: [String] })
    @IsString()
    html: string;
}