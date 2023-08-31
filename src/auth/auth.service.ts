import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserLoginDto, UserLoginDtoAuth, UserLoginDtoError } from 'src/users/dto/userLoginDto';
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
        const user = await this.userRepository.findOne(
            {
                where:
                    { userName: userLogin.userName },
                relations: ["roles", "profile", "posts"],
            });
        if (user === null) return { message: "Error username", status: 401 };
        const userPassCheck = await bcrypt.compare(userLogin.password, user.password);
        if (user !== null && userPassCheck) {
            const payload = { userId: user.id, userName: user.userName, email: user.profile.email, role: user.roles.name };
            const access_token = await this.jwtService.signAsync(payload);
            return { access_token, status: 200 };
        } else {
            return { message: "Error password", status: 401 };
        }
    }

    public async forgotService(email: string) {
        const existsUserEmail = await this.profileRepository.findOne({
            where: { email: email },
        });
        if (!existsUserEmail) {
            return new HttpException('User Email not exists', HttpStatus.CONFLICT);
        }
        return existsUserEmail
    }
}
