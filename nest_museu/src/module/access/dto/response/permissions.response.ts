import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PERMISSIONS } from '../../constants/permissions.constants';
import { Resources } from '../../entities/resources.entity';
import { Roles } from '../../entities/role.entity';

export class PermissionsResponse {
  @ApiProperty({
    description: PERMISSIONS.SWAGGER.ID_PERMISSIONS,
    example: '1',
  })
  @Expose()
  idPermission!: number;

  @ApiProperty({
    description: PERMISSIONS.SWAGGER.ROLE,
    example: 'administrador',
  })
  @Expose()
  role!: Roles;

  @ApiProperty({
    description: PERMISSIONS.SWAGGER.RESOURCE,
    example: 'eventos',
  })
  @Expose()
  resource!: Resources;

  @ApiProperty({
    description: PERMISSIONS.SWAGGER.ACTION,
    example: 'leitura',
  })
  @Expose()
  action!: string;

  @ApiProperty({
    description: PERMISSIONS.SWAGGER.POSSESSION,
    example: 'qualquer um',
  })
  @Expose()
  possession!: string;

  constructor(data: Partial<PermissionsResponse> = {}) {
    Object.assign(this, data);
  }
}
