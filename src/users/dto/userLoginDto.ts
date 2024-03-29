import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({ description: 'UserName is required', example: "pedro.p", type: [String] })
    userName: string;

    @ApiProperty({ description: 'Password is required', type: [String] })
    password: string;
}

export class UserLoginDtoAuth {
    access_token: string;
    status: number;
}

export class UserLoginDtoError {
    message: string;
    status: number;
}