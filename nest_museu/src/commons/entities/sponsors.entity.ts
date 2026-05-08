import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class SponsorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_sponsor" })
  idSponsor!: number;
  @Column({ name: "name", nullable: false })
  name!: string;
  @Column({ name: "logo_url", type: "text" })
  logoURL!: string;
}