import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PreRegistration } from 'src/entities/preRegistration.entity';
import { PreRegistrationCreateDto } from './dto/preRegistrationCreateDto';

@Injectable()
export class PreRegistrationService {
    constructor (@InjectRepository(PreRegistration) private preRegistrationRepository: Repository<PreRegistration>) { }

    public async createPreRegistration(payload: PreRegistrationCreateDto): Promise<PreRegistration | HttpException> {
        try {
            const preRegistration = new PreRegistration();
            preRegistration.firstName = payload.firstName;
            preRegistration.lastName = payload.lastName;
            preRegistration.email = payload.email;
            preRegistration.phone = payload.phone;
            preRegistration.career = payload.career;
            preRegistration.extension = payload.extension;

            const newPreRegistration = this.preRegistrationRepository.create(preRegistration);
            return await this.preRegistrationRepository.save(newPreRegistration);
        } catch (err) {
            throw new HttpException({
                success: false,
                message: err.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}