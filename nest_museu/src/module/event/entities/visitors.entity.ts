import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventBooking } from './eventbooking.entity';

@Entity('visitors')
export class Visitor extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_visitor' })
  idVisitor!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: true })
  cpf?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  // Relacionamento: Um visitante pode ter vários agendamentos ao longo do tempo
  @OneToMany(() => EventBooking, (booking: EventBooking) => booking.visitor)
  bookings!: EventBooking[];

  constructor(data: Partial<Visitor> = {}) {
    super();
    Object.assign(this, data);
  }
}
