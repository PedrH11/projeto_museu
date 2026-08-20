import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { EVENT_SPOTLIGHT } from '../../../constants/event_spotlight.constants';

export class EventSpotlightRequest {
  static entityName = EVENT_SPOTLIGHT.ALIAS.toLowerCase();

  @ApiProperty({ description: EVENT_SPOTLIGHT.SWAGGER.ID_EVENT, example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  id_event!: number;

  @ApiProperty({
    description: EVENT_SPOTLIGHT.SWAGGER.START,
    example: '2026-04-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  start_date!: Date;

  @ApiProperty({
    description: EVENT_SPOTLIGHT.SWAGGER.END,
    example: '2026-04-30T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  end_date!: Date;

  constructor(data: Partial<EventSpotlightRequest> = {}) {
    Object.assign(this, data);
  }
}
