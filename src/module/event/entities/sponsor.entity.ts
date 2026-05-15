import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { Event } from './event.entity';

@Entity('sponsors')
export class Sponsor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSponsor!: number;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  logoUrl?: string;

  //@ManyToMany(() => Event, (event: Event) => event.sponsors)
  events!: Event[];
}
