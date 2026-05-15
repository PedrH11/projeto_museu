import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SESSION } from '../../constants/session.constants';

export class SessionResponse {
  @ApiProperty({
    description: SESSION.SWAGGER.TOKEN,
    example: 'token de acesso',
  })
  @Expose()
  token!: string;

  @ApiProperty({
    description: SESSION.SWAGGER.EXPIRES_AT,
    example: '99:99:99',
  })
  @Expose()
  expiresAt!: Date;

  @ApiProperty({
    description: SESSION.SWAGGER.IP_ADDRESS,
    example: '192.168.0.1',
  })
  @Expose()
  ipAddress!: string;

  constructor(partial: Partial<SessionResponse>) {
    Object.assign(this, partial);
  }
}
