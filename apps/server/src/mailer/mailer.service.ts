import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { ServiceUnavailableException } from '@nestjs/common';
import Client from 'mailgun.js/client';
import mjml2html from 'mjml';
import path from 'path';
import { readFile } from 'fs/promises';
import handlebars from 'handlebars';
import { APP_ROUTES } from './helpers/consts';
import { ConfigService } from '@nestjs/config';

interface NestedObject {
  [key: string]: string | NestedObject;
}

@Injectable()
export class MailerService {
  private readonly client: Client | null;

  constructor(private configService: ConfigService) {
    const apiKey = configService.get<string>('MAILGUN_API_KEY')
    if (!apiKey) {
      this.client = null
      return
    }

    const mailgun = new Mailgun(FormData);

    this.client = mailgun.client({
      username: 'api',
      key: apiKey,
    });

    if (!this.client) {
      throw new Error('Failed to initialize Mailjet client.');
    }
  }

  async sendMail({
    templatePath,
    subject,
    to,
    locales,
  }: {
    templatePath: string;
    subject: string;
    to: string;
    locales: NestedObject;
  }) {
    try {
      if (!this.client) {
        console.error('Mailjet client initialization failed - email not sent.')
        return
      }
      const mailPath = path.resolve(templatePath);

      const input = await readFile(mailPath, 'utf8');

      const template = handlebars.compile(mjml2html(input).html);

      const output = template(locales);

      await this.client.messages.create(
        'sandbox3eb29995cbe0440398cb848be5a87c60.mailgun.org',
        {
          from: 'Mailgun Sandbox <postmaster@sandbox3eb29995cbe0440398cb848be5a87c60.mailgun.org>',
          to: [to],
          subject,
          html: output,
        },
      );
    } catch (e) {
      console.log(e);
      throw new ServiceUnavailableException('Email cannot be send');
    }
  }

  async sendRegisterMail({
    to,
    locales,
  }: {
    to: string;
    locales: { confirmationToken: string };
  }) {
    this.sendMail({
      templatePath: './src/mailer/templates/register.mjml',
      to,
      subject: 'Verify your new Infflu account',
      locales: {
        confirmationLink: `${this.configService.get<string>('APP_PUBLIC_URL')}${APP_ROUTES.ACTIVATE}${locales.confirmationToken}`,
      },
    });
  }

  async sendForgotPasswordMail({
    to,
    locales,
  }: {
    to: string;
    locales: { forgotPasswordToken: string };
  }) {
    this.sendMail({
      templatePath: './src/mailer/templates/forgotPassword.mjml',
      to,
      subject: 'Verify your new Infflu account',
      locales: {
        forgotPasswordLink: `${this.configService.get<string>('APP_PUBLIC_URL')}${APP_ROUTES.PASSWORD}${locales.forgotPasswordToken}`,
      },
    });
  }
}
