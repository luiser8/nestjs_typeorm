import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Profile } from 'src/entities/profile.entity';
import { RefreshTokenDto, UserLoginDto, UserLoginDtoAuth, UserLoginDtoError, UserUpdateTokenDto } from 'src/users/dto/userLoginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(Users) private userRepository: Repository<Users>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        private jwtService: JwtService
    ) {
    }

    public async loginService(userLogin: UserLoginDto): Promise<UserLoginDtoAuth | UserLoginDtoError> {
        try {
            const user = await this.userRepository.findOne({
                where: { userName: userLogin.userName },
                relations: ["roles", "profile"],
            });

            if (!user || !user.password) {
                return { message: "Error: Username not found or invalid user data", status: 401 };
            }

            if (!userLogin.password || typeof userLogin.password !== 'string') {
                return { message: "Error: Invalid password input", status: 400 };
            }

            const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
            if (!isPasswordValid) {
                return { message: "Error: Invalid password", status: 401 };
            }

            const { id, userName, roles, profile } = user;
            const payload = {
                userId: id,
                userName,
                email: profile.email,
                role: roles.name,
            };

            const access_token = await this.jwtService.signAsync(payload, { expiresIn: "10h" });
            const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

            const tokensUpdated = await this.updateTokens({
                id,
                new_access_token: access_token,
                new_refresh_token: refresh_token,
            });

            if (!tokensUpdated) {
                return { message: "Error: Failed to update tokens", status: 500 };
            }

            return { access_token, refresh_token, status: 200 };
        } catch (error) {
            console.error("Login error:", error);
            return { message: "Error: Internal server error", status: 500 };
        }
    }

    public async refreshService(refreshToken: RefreshTokenDto): Promise<UserUpdateTokenDto | UserLoginDtoError> {
        const user = await this.userRepository.findOne(
            {
                where:
                    { refreshToken: refreshToken.refresh_token },
                relations: ["roles", "profile"],
            });
        if (user === null) return { message: "Error current token", status: 401 };
        const payload = { userId: user.id, userName: user.userName, email: user.profile.email, role: user.roles.name };
        const new_access_token = await this.jwtService.signAsync(payload, { expiresIn: "10h" });
        const new_refresh_token = await this.jwtService.signAsync(payload, { expiresIn: "7d" });

        const updateUser = this.updateTokens({ id: user.id, new_access_token, new_refresh_token });
        if (updateUser)
            return { new_access_token, new_refresh_token, status: 200 };
    }

    public async forgotService(email: string) {
        const existsUserEmail = await this.profileRepository.findOne({
            where: { email },
        });
        if (!existsUserEmail) {
            return new HttpException('User Email not exists', HttpStatus.CONFLICT);
        }
        return existsUserEmail
    }

    private async updateTokens(user: UserUpdateTokenDto): Promise<boolean> {
        const userUpdated = await this.userRepository.update(user.id, { token: user.new_access_token, refreshToken: user.new_refresh_token });
        if (userUpdated === null) return false;
        return true;
    }
}
