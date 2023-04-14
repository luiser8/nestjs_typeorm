import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor (private readonly mailerService: MailerService) { }

    async send(email: string): Promise<void> {
        await this.mailerService
            .sendMail({
                to: email, // list of receivers
                from: process.env.APP_EMAIL_USER, // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then(() => { })
            .catch(() => { });
    }
}