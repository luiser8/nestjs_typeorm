import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class PreRegistrationCreateDto {
    @ApiProperty({ description: 'FirstName is required', example: "", type: [String] })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'LastName is required', example: "", type: [String] })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Email is required', example: "", type: [String] })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Phone is required', example: "", type: [String] })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Career is required', example: "", type: [String] })
    @IsString()
    career: string;

    @ApiProperty({ description: 'Extension is required', example: "", type: [String] })
    @IsString()
    extension: string;
}