import { PrimaryColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity.js';

@Entity('event_colaborator_relation')
export class EventSponsor {
  @PrimaryColumn({ name: 'id_event' })
  idEvent!: number;

  @PrimaryColumn({ name: 'id_colaborator' })
  idSponsor!: number;

  constructor(data: Partial<EventSponsor> = {}) {
    Object.assign(this, data);
  }
}
