import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { TextField } from '../../../../commons/decorators/validation/text.decorators';
import { USUARIO } from '../../constants/usuario.constantes';

export class UsuarioRequest {
  static entityName = USUARIO.ALIAS.toLowerCase();
  @ApiProperty({ description: USUARIO.SWAGGER.ID_USUARIO, example: '1' })
  @Type(() => Number)
  @IsOptional()
  idUsuario?: number;
  @ApiProperty({
    description: USUARIO.SWAGGER.USERNAME,
    example: 'Antônio da Silva',
  })
  @TextField({ required: true, min: 6, max: 100, label: 'Nome', gender: 'm' })
  // necessário para O whitelist + forbidNonWhitelisted só permite propriedades que esteja marcadas com o decorator
  username!: string;
  @ApiProperty({
    description: USUARIO.SWAGGER.EMAIL,
    example: 'antonio@dominio.com.br',
  })
  @TextField({
    required: true,
    min: 6,
    max: 100,
    label: 'E-mail',
    gender: 'm',
    email: true,
  })
  email!: string;
  @ApiProperty({
    description: USUARIO.SWAGGER.PASSWORD,
    example: '***************',
  })
  @TextField({ required: true, min: 6, max: 20, label: 'Senha', gender: 'f' })
  password!: string;
  @ApiProperty({
    description: USUARIO.SWAGGER.CONFIRM_PASSWORD,
    example: '**************',
  })
  @TextField({
    required: true,
    min: 6,
    max: 20,
    label: 'Confirme a Senha',
    gender: 'f',
  })
  confirmPassword!: string;
  @ApiProperty({ description: USUARIO.SWAGGER.IMAGE_PATH })
  imagePath?: string;

  constructor(data: Partial<UsuarioRequest> = {}) {
    Object.assign(this, data);
  }
}
