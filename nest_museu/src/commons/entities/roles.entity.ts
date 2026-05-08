import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_roles" })
  idRole!: number;
  @Column({
    name: "nome_roles",
    unique: true,
    type: "varchar",
    length: 50,
    nullable: false,
  })
  role!: string;
}