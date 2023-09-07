import {
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto, UserLoginDtoAuth, UserLoginDtoError } from 'src/users/dto/userLoginDto';

@ApiTags('Auth')
@Controller({
    path: 'auth',
    version: '1',
})
export class AuthController {
    constructor (
        private authService: AuthService,
        private emailService: EmailService,
    ) { }

    @ApiOperation({ summary: 'Reenvía link de activación' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Success",
        type: UserLoginDtoAuth
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: "Error",
        type: UserLoginDtoError
    })
    @Post('login')
    async loginUser(@Body() loginUser: UserLoginDto): Promise<UserLoginDtoAuth | UserLoginDtoError> {
        return await this.authService.loginService(loginUser);
    }

    @HttpCode(HttpStatus.OK)
    @Get('forgot')
    async forgot(@Query('email') email: string) {
        return await this.authService.forgotService(email);
    }
}
