import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EVENT_SPOTLIGHT } from '../../../constants/event_spotlight.constants';

export class EventSpotlightResponse {
  @ApiProperty({
    description: EVENT_SPOTLIGHT.SWAGGER.ID_EVENT_SPOTLIGHT,
    example: '1',
  })
  @Expose()
  idEventSpotlight!: number;

  @ApiProperty({ description: EVENT_SPOTLIGHT.SWAGGER.ID_EVENT, example: '1' })
  @Expose()
  idEvent!: number;

  @ApiProperty({
    description: EVENT_SPOTLIGHT.SWAGGER.START,
    example: 'Data de início: 01/04/2026',
  })
  @Expose()
  start_date!: Date;

  @ApiProperty({
    description: EVENT_SPOTLIGHT.SWAGGER.END,
    example: 'Data de encerramento: 30/04/2026',
  })
  @Expose()
  end_date!: Date;

  constructor(data: Partial<EventSpotlightResponse> = {}) {
    Object.assign(this, data);
  }
}
