import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import * as ejs from 'ejs';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import { ServerErrorExceptions } from '../../../commons/excpetions/error/server.error.exceptions';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: this.configService.getOrThrow<string>('EMAIL_HOST'), // ex: 'gmail'
      auth: {
        user: this.configService.getOrThrow<string>('EMAIL_USER'),
        pass: this.configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }

  async sendMailWithTemplate(
    options: Mail.Options,
    templateName: string,
    templateData: any,
  ) {
    try {
      const templatePath = path.join(
        __dirname,
        'templates',
        `${templateName}.ejs`,
      );

      const redirectHtml: string = await ejs.renderFile(
        templatePath,
        templateData,
      );

      const mailOptions: Mail.Options = {
        ...options,
        html: redirectHtml,
      };

      return await this.nodemailerTransport.sendMail(mailOptions);
    } catch (error: any) {
      throw new ServerErrorExceptions(
        'Falha no serviço de e-mail.',
        error.message,
      );
    }
  }
}
