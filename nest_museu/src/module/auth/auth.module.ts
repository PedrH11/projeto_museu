import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { LocalAuthenticationGuard } from './config/guards/localAuthentication.guard';
import { LocalStrategy } from './config/strategy/local.strategy';
import { AccountController } from './controllers/account.controller';
import { AuthenticationController } from './controllers/authentication.controller';
import { TwoFactorAuthenticationController } from './controllers/twoFactorAuthentication.controller';
import { Account } from './entities/account.entity';
import { Credentials } from './entities/credentials.entity';
import { Session } from './entities/session.entity';
import { AccountService } from './service/account.service';
import { AuthenticationService } from './service/authentication.service';
import { SessionService } from './service/session.service';
import { TwoFactorAuthenticationService } from './service/twoFactorAuthentication.service';

const moduleController = [
  AccountController,
  AuthenticationController,
  TwoFactorAuthenticationController,
];

const moduleProviders = [
  AuthenticationService,
  LocalStrategy,
  LocalAuthenticationGuard,
  AccountService,
  TwoFactorAuthenticationService,
  SessionService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Session, Account, Credentials]),
    forwardRef(() => EmailModule),
    forwardRef(() => UsuarioModule),
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'), // Use a sua variável de ambiente
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [...moduleProviders],
  controllers: [...moduleController],
  exports: [AccountService, AuthenticationService],
})
export class AuthModule {}
