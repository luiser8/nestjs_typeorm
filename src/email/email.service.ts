import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailBodyDto } from './dto/emailBodyDto';

@Injectable()
export class EmailService {
  constructor (private readonly mailerService: MailerService) { }

  async send(body: EmailBodyDto): Promise<void> {
    await this.mailerService
      .sendMail({
        to: body.emailTo,
        from: process.env.APP_EMAIL_USER,
        subject: body.subject,
        text: body.message,
        html: body.html,
      })
      .then((res) => {
        return res;
      })
      .catch((err) =>
        {
          console.log(err);
        });
  }
}
