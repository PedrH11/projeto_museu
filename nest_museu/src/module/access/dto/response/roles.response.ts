import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ROLES } from '../../constants/roles.constants';

export class RolesResponse {
  @Expose()
  @ApiProperty({
    description: ROLES.SWAGGER.ID_ROLES,
    example: '1',
  })
  idRoles!: number;
  @Expose()
  @ApiProperty({
    description: ROLES.SWAGGER.NOME_ROLES,
    example: 'administrador',
  })
  nomeRoles!: string;

  constructor(data: Partial<RolesResponse> = {}) {
    Object.assign(this, data);
  }
}
