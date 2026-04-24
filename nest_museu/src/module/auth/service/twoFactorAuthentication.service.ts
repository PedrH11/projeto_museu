import { Injectable } from '@nestjs/common';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { randomInt } from 'crypto';

@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async generateTwoFactorAuthenticationSecret(user: Usuario) {
    const digits = randomInt(100000, 999999).toString();
    const expiresIn = 10;
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + expiresIn);
    await this.usuarioService.setTwoFactorAuthenticationSecret(
      digits,
      expirationDate,
      user.idUsuario,
    );

    return {
      digits,
      expiresAt: expirationDate,
    };
  }

  public async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    user: Usuario,
  ) {
    const agora = new Date();

    const isCodeMatch =
      user.twoFactorAuthenticationSecret === twoFactorAuthenticationCode;
    const isNotExpired = agora < user.mfaExpiresAt;

    return isCodeMatch && isNotExpired;
  }
}
