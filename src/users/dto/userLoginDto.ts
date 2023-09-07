import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
    @ApiProperty({ description: 'UserName is required', example: "pedro.p", type: [String] })
    userName: string;

    @ApiProperty({ description: 'Password is required', example: "mypassword", type: [String] })
    password: string;
}

export class UserLoginDtoAuth {
    @ApiProperty({ description: 'Access Token', example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.", type: [String] })
    access_token: string;

    @ApiProperty({ description: 'Authorized', example: "200", type: [Number] })
    status: number;
}

export class UserLoginDtoError {
    @ApiProperty({ description: 'Error username | Error password', example: "Error password", type: [String] })
    message: string;

    @ApiProperty({ description: 'Not authorized', example: "401", type: [Number] })
    status: number;
}