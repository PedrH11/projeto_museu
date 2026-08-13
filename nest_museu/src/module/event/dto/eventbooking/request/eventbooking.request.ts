import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { DateField } from '../../../../../commons/decorators/validation/date.decorator';
import { TextField } from '../../../../../commons/decorators/validation/text.decorator';
import { BookingStatusEnum } from '../../../entities/eventbooking.entity';

export class EventBookingRequest {
  @ApiProperty({
    description: 'ID do Evento a ser reservado',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  id_event!: number;

  @ApiProperty({
    description: 'ID do Visitante avulso (opcional se for grupo)',
    example: 2,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Expose()
  id_visitor!: number;

  @ApiProperty({
    description: 'ID do Usuário (opcional)',
    example: 3,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Expose()
  id_user!: number;

  @ApiProperty({
    description: 'ID do Grupo Escolar (opcional se for visitante avulso)',
    example: 4,
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Expose()
  id_group!: number;

  @ApiProperty({
    description: 'Quantidade esperada de participantes',
    example: 45,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  expected_participant_count!: number;

  @ApiProperty({
    description: 'Data e hora da reserva',
    example: '2026-10-15T14:30:00.000Z',
  })
  @DateField({ required: true, label: 'Data da reserva', gender: 'f' })
  @IsNotEmpty()
  @Expose()
  booking_date!: Date;

  @ApiProperty({
    description: 'Status da reserva',
    enum: BookingStatusEnum,
    example: BookingStatusEnum.PENDENTE,
  })
  @IsString()
  @IsEnum(BookingStatusEnum)
  @Expose()
  status!: BookingStatusEnum;

  @ApiProperty({
    description: 'Observações adicionais para a reserva',
    example: 'Turma de 3º ano do ensino médio',
    required: false,
  })
  @TextField({
    required: false,
    min: 0,
    max: 250,
    label: 'Observações',
    gender: 'f',
  })
  @IsString()
  @IsOptional()
  @Expose()
  notes!: string;

  constructor(data: Partial<EventBookingRequest> = {}) {
    Object.assign(this, data);
  }
}
