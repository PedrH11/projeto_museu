import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmailConfirmationController } from './controller/emailConfirmation.controller';
import EmailSchedulingController from './controller/emailScheduling.controller';
import EmailService from './service/email.service';
import { EmailConfirmationService } from './service/emailConfirmation.service';
import EmailSchedulingService from './service/emailScheduling.service';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => AuthModule),
    forwardRef(() => UsuarioModule),
  ],
  providers: [EmailService, EmailConfirmationService, EmailSchedulingService],
  exports: [EmailService, EmailConfirmationService],
  controllers: [EmailConfirmationController, EmailSchedulingController],
})
export class EmailModule {}
