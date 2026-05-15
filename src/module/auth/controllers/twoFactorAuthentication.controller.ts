import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsuarioService } from '../../usuario/service/usuario.service';
import JwtAuthenticationGuard from '../config/guards/jwt-authentication.guard';
import RequestWithUser from '../config/requestWithUser.interface';
import { TwoFactorAuthenticationCodeResponse } from '../dto/response/twoFactorAuthenticationCode.response';
import { AuthenticationService } from '../service/authentication.service';
import { TwoFactorAuthenticationService } from '../service/twoFactorAuthentication.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UsuarioService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthenticationGuard)
  async register(@Res() response: Response, @Req() request: RequestWithUser) {}

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body()
    { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeResponse,
  ) {
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(
      request.user.idUsuario,
    );
  }

  @Post('authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body()
    { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeResponse,
  ) {
    const isCodeValid =
      await this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        request.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const { cookie: accessTokenCookie } =
      this.authenticationService.getCookieWithJwtAccessToken(
        request.user.idUsuario,
        true,
      );

    request.res?.setHeader('Set-Cookie', [accessTokenCookie]);

    return request.user;
  }
}
