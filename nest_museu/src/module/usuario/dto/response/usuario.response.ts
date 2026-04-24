import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { USUARIO } from '../../constants/usuario.constantes';

export class UsuarioResponse {
  @ApiProperty({ description: USUARIO.SWAGGER.ID_USUARIO, example: '1' })
  @Expose()
  idUsuario!: number;
  @Expose()
  @ApiProperty({
    description: USUARIO.SWAGGER.USERNAME,
    example: 'Antônio da Silva',
  })
  username!: string;
  @Expose()
  @ApiProperty({
    description: USUARIO.SWAGGER.EMAIL,
    example: 'antonio@dominio.com.br',
  })
  email!: string;
  @ApiProperty({ description: USUARIO.SWAGGER.ACTIVE })
  @Expose()
  active!: boolean;
  @ApiProperty({ description: USUARIO.SWAGGER.IMAGE_PATH })
  imagePath!: string;

  constructor(data: Partial<UsuarioResponse> = {}) {
    Object.assign(this, data);
  }
}
