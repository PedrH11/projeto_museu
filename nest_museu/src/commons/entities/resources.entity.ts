import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class ResourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_recurso" })
  idResource!: number;
  @Column({
    name: "nome_recurso",
    unique: true,
    type: "varchar",
    length: 50,
    nullable: false,
  })
  role!: string;
}