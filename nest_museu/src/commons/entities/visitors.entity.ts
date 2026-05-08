import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class VisitorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_visitor" })
  idVisitor!: number;
  @Column({ name: "name", nullable: false })
  name!: string;
  @Column({ name: "email", unique: true, nullable: false })
  email!: string;
  @Column({ name: "cpf", unique: true, type: "varchar", length: 14 })
  cpf!: string;
  @Column({ name: "phone", type: "varchar", length: 20 })
  phone!: string;
}