import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EventBooking } from './eventbooking.entity';
//import { SchoolGroup } from '../../school/entities/school-group.entity';

@Entity('event_booking_groups')
export class EventBookingGroup {
  @PrimaryColumn({ name: 'id_booking', type: 'integer' })
  id_booking!: number;

  @PrimaryColumn({ name: 'id_group', type: 'integer' })
  id_group!: number;

  @ManyToOne(() => EventBooking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_booking' })
  booking!: EventBooking;

  /* @ManyToOne(() => SchoolGroup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_group' })
  //group!: SchoolGroup;*/

  @Column({
    name: 'attending_students',
    type: 'jsonb',
    default: () => "'[]'",
  })
  attending_students!: string[];
}
