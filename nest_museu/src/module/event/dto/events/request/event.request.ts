import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
  IsHexColor,
} from 'class-validator';
import { BooleanField } from '../../../../commons/decorators/validation/boolean.decorator';
import { DateField } from '../../../../commons/decorators/validation/date.decorator';
import { TextField } from '../../../../commons/decorators/validation/text.decorator';
import { EVENT } from '../../constants/event.constants';

export class EventRequest {
  static entityName = EVENT.ALIAS.toLowerCase();

  @ApiProperty({
    description: EVENT.SWAGGER.TITLE,
    example: 'Exposição peças Dr. Renato Cordeiro',
  })
  @TextField({ required: true, min: 6, max: 250, label: 'Titulo', gender: 'm' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  title!: string;

  @ApiProperty({
    description: EVENT.SWAGGER.DESCRIPTION,
    example: 'Peças pertencentes família ',
  })
  @TextField({
    required: false,
    min: 6,
    max: 250,
    label: 'Descrição',
    gender: 'f',
  })
  @IsString()
  @IsOptional()
  @Expose()
  description!: string;

  @ApiProperty({
    description: EVENT.SWAGGER.START,
    example: '2026-04-01T00:00:00.000Z',
  })
  @DateField({ required: true, label: 'Data de início', gender: 'f' })
  @IsNotEmpty()
  @Expose()
  start_date!: Date;

  @ApiProperty({
    description: EVENT.SWAGGER.START_TIME,
    example: '09:00:00',
  })
  @TextField({
    required: true,
    min: 2,
    max: 8,
    label: 'Hora de início',
    gender: 'f',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  startTime!: string;

  @ApiProperty({
    description: EVENT.SWAGGER.DURATION_MINUTES,
    example: 60,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  durationMinutes!: number;

  @ApiProperty({
    description: EVENT.SWAGGER.END,
    example: '2026-04-30T00:00:00.000Z',
  })
  @DateField({ required: true, label: 'Data de encerramento', gender: 'f' })
  @IsNotEmpty()
  @Expose()
  end_date!: Date;

  @ApiProperty({ description: EVENT.SWAGGER.ALLDAY, example: true })
  @BooleanField({ required: true, label: 'Todos os dias', gender: 'm' })
  @IsNotEmpty()
  @Expose()
  allDay!: boolean;

  @ApiProperty({
    description: EVENT.SWAGGER.LOCATION,
    example: 'Museu de Birigui ',
  })
  @TextField({ required: true, min: 6, max: 100, label: 'Local', gender: 'm' })
  @IsString()
  @IsNotEmpty()
  @Expose()
  location!: string;

  @ApiProperty({ description: EVENT.SWAGGER.COLOR, example: '#0000FF' })
  @TextField({ required: false, min: 4, max: 30, label: 'Cor', gender: 'f' })
  @IsString()
  @IsHexColor()
  @IsOptional()
  @Expose()
  color!: string;

  @ApiProperty({ description: 'Capacidade máxima do evento', example: 100 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  maxCapacity!: number;

  constructor(data: Partial<EventRequest> = {}) {
    Object.assign(this, data);
  }
}
