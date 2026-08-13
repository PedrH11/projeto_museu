import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../commons/entities/base.entity';

import { Event } from './event.entity';
import { Visitor } from './visitors.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
//import { Group } from './groups.entity';

export enum BookingStatusEnum {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
}

@Entity('event_bookings')
export class EventBooking extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_booking' })
  id_booking!: number;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'id_event' })
  event!: Event;

  @ManyToOne(() => Visitor, { nullable: true })
  @JoinColumn({ name: 'id_visitor' })
  visitor!: Visitor;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;

  //@ManyToOne(() => Group, { nullable: true })
  //@JoinColumn({ name: 'id_group' })
  //group!: Group;

  @Column({ name: 'expected_participant_count', type: 'integer' })
  expected_participant_count!: number;

  @Column({
    name: 'booking_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  booking_date!: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: BookingStatusEnum,
    default: BookingStatusEnum.PENDENTE,
  })
  status!: BookingStatusEnum;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes!: string;
}
