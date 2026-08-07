import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { EVENT } from '../../constants/event.constants';

export class AssignSponsorToEventRequest {
  @ApiProperty({ description: EVENT.SWAGGER.ID_EVENT, example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  idEvent!: number;

  @ApiProperty({
    description: 'Código do Patrocinador de identificação única',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  idSponsor!: number;
}
