import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class SchoolEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_school" })
  idSchool!: number;
  @Column({ name: "name", nullable: false })
  name!: string;
  @Column({ name: "cnpj", unique: true, type: "varchar", length: 18 })
  cnpj!: string;
}