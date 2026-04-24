import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationService } from '../../auth/service/authentication.service';
import { UsuarioService } from '../../usuario/service/usuario.service';
import VerificationTokenPayload from '../config/verificationTokenPayload.interface';
import EmailService from './email.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => UsuarioService))
    private readonly usuarioService: UsuarioService,
    @Inject(forwardRef(() => AuthenticationService))
    private readonly authenticationService: AuthenticationService
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRE'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'
      )}s`,
    });

    const url = `${this.configService.getOrThrow(
      'EMAIL_CONFIRMATION_URL'
    )}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  public async resendConfirmationLink(userId: number) {
    const usuario = await this.usuarioService.buscarPorId(userId);
    if (usuario.emailVerified) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(usuario.email);
  }

  public async confirmEmail(email: string) {
    const credentials = await this.authenticationService.getByEmail(email);
    if (credentials.usuario.emailVerified) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usuarioService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error: any) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
