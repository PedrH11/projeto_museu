import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoleEntity } from "./roles.entity";
import { ResourceEntity } from "./resources.entity";

@Entity()
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ name: "id_permission" })
  idPermission!: number;
  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.idRole)
  @JoinColumn({ name: "id_roles" })
  role!: RoleEntity;
  @ManyToOne(
    () => ResourceEntity,
    (resource: ResourceEntity) => resource.idResource,
  )
  @JoinColumn({ name: "id_resources" })
  resource!: ResourceEntity;
  @Column({ name: "action", nullable: false, type: "varchar", length: 20 })
  action!: string;
  @Column({ name: "possession", type: "varchar", length: 10, default: "any" })
  possession!: string;
  @Column({ name: "attributes", type: "varchar", length: 10, default: "*" })
  attributes!: string;
}
