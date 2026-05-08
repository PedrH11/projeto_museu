import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_event" })
  idEvent!: number;
  @Column({ name: "title", type: "text", nullable: false })
  title!: string;
  @Column({ name: "description", type: "text" })
  description!: string;
  @Column({ name: "start_date", type: "timestamptz", nullable: false })
  startDate!: Date;
  @Column({ name: "end_date", type: "timestamptz", nullable: false })
  endDate!: Date;
  @Column({ name: "all_day", type: "boolean", default: false })
  allDay!: boolean;
  @Column({ name: "location", type: "varchar", length: 100 })
  location!: string;
  @Column({ name: "color", type: "varchar", length: 30 })
  color!: string;
  @Column({ name: "start_time", type: "varchar", length: 5 })
  startTime!: string;
  @Column({ name: "duration_minutes", type: "int" })
  durationMinutes!: number;
  @Column({ name: "max_capacity", type: "int" })
  maxCapacity!: number;
}