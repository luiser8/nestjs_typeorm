import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreRegistrationController } from './preRegistration.controller';
import { PreRegistrationService } from './preRegistration.service';
import { PreRegistration } from 'src/entities/preRegistration.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([PreRegistration])],
  controllers: [PreRegistrationController],
  providers: [PreRegistrationService, EmailService],
})
export class PreRegistrationModule { }