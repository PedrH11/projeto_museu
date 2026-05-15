import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { SchoolRepresentative } from './schoolrepresentaives.entity';
import { Student } from './students.entity';
import { Visitor } from './visitors.entoty';

@Entity('event_bookings')
export class EventBooking extends BaseEntity {
  @PrimaryGeneratedColumn()
  idBooking!: number;

  @ManyToOne(() => Event)
  event!: Event;

  @ManyToOne(() => SchoolRepresentative)
  representative!: SchoolRepresentative;

  @ManyToOne(() => Visitor)
  visitor!: Visitor;

  @Column({ type: 'integer' })
  expectedStudentCount!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bookingDate!: Date;

  @Column({ type: 'varchar', default: 'pending' }) // pending, confirmed, cancelled
  status!: string;

  @OneToMany(() => Student, (student: Student) => student.booking, {
    cascade: true,
  })
  students!: Student[];
}
