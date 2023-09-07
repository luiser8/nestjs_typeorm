import {
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
    Query,
    UseGuards,
} from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshTokenDto, UserLoginDto, UserLoginDtoAuth, UserLoginDtoError, UserUpdateTokenDto } from 'src/users/dto/userLoginDto';
import { AuthGuard } from './auth.guard';

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

    @ApiOperation({ summary: 'User authentication' })
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

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Success",
        type: UserUpdateTokenDto
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: "Error",
        type: UserLoginDtoError
    })
    @Post('refresh')
    async refresh(@Body() currentToken: RefreshTokenDto): Promise<UserUpdateTokenDto | UserLoginDtoError> {
        return await this.authService.refreshService(currentToken);
    }

    @HttpCode(HttpStatus.OK)
    @Get('forgot')
    async forgot(@Query('email') email: string) {
        return await this.authService.forgotService(email);
    }
}
