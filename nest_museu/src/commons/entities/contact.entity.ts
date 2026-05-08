import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class ContactEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_contact" })
  idContact!: number;
  @Column({ name: "first_name", type: "varchar", length: 100, nullable: false })
  firstName!: string;
  @Column({ name: "last_name", type: "varchar", length: 100, nullable: false })
  lastName!: string;
  @Column({ name: "phone", type: "varchar", length: 50, nullable: false })
  phone!: string;
  @Column({ name: "email", type: "varchar", length: 100, nullable: false })
  email!: string;
  @Column({ name: "message", type: "text", nullable: false })
  message!: string;
  @Column({ name: "agreed_to_privacy", nullable: false, default: false })
  agreedPrivacy!: boolean;
}
