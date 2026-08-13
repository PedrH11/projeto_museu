import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../commons/entities/base.entity';
import { EVENT_SPOTLIGHT } from '../constants/event_spotlight.constants';
import { Event } from './event.entity';

@Entity(EVENT_SPOTLIGHT.ENTITY)
export class EventSpotlight extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: EVENT_SPOTLIGHT.TABLE_FIELDS.ID_EVENT_SPOTLIGHT,
  })
  idEventSpotlight!: number;

  @ManyToOne(() => Event)
  @JoinColumn({ name: EVENT_SPOTLIGHT.TABLE_FIELDS.ID_EVENT })
  event!: Event;

  @Column({
    name: EVENT_SPOTLIGHT.TABLE_FIELDS.START_DATE,
    type: 'timestamptz',
  })
  start_date!: Date;

  @Column({
    name: EVENT_SPOTLIGHT.TABLE_FIELDS.END_DATE,
    type: 'timestamptz',
  })
  end_date!: Date;

  constructor(data: Partial<EventSpotlight> = {}) {
    super();
    Object.assign(this, data);
  }
}
