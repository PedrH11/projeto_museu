import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BookingStatusEnum } from '../../../entities/eventbooking.entity';

export class EventBookingResponse {
  @ApiProperty({ description: 'ID único da Reserva', example: 1 })
  @Expose()
  id_booking!: number;

  @ApiProperty({
    description: 'Quantidade esperada de participantes',
    example: 45,
  })
  @Expose()
  expected_participant_count!: number;

  @ApiProperty({
    description: 'Data e hora da reserva',
    example: '2026-10-15T14:30:00.000Z',
  })
  @Expose()
  booking_date!: Date;

  @ApiProperty({
    description: 'Status da reserva',
    enum: BookingStatusEnum,
    example: BookingStatusEnum.PENDENTE,
  })
  @Expose()
  status!: BookingStatusEnum;

  @ApiProperty({
    description: 'Observações adicionais',
    example: 'Turma de 3º ano do ensino médio',
  })
  @Expose()
  notes!: string;

  @ApiProperty({ description: 'Dados do Evento relacionado' })
  @Expose()
  event!: any;

  @ApiProperty({
    description: 'Dados do Visitante relacionado (se houver)',
    required: false,
  })
  @Expose()
  visitor!: any;

  @ApiProperty({
    description: 'Dados do Usuário relacionado (se houver)',
    required: false,
  })
  @Expose()
  user!: any;

  @ApiProperty({
    description: 'Dados do Grupo Escolar relacionado (se houver)',
    required: false,
  })
  @Expose()
  group!: any;

  constructor(data: Partial<EventBookingResponse> = {}) {
    Object.assign(this, data);
  }
}
