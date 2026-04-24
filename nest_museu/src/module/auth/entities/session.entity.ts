import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { SESSION } from '../constants/session.constants';

@Entity(SESSION.ENTITY)
export class Session {
  @PrimaryGeneratedColumn({ name: SESSION.TABLE_FIELDS.ID_SESSION })
  idSession?: number;

  @Column({ name: SESSION.TABLE_FIELDS.ID_USUARIO })
  idUsuario!: number;

  @Column({ name: SESSION.TABLE_FIELDS.TOKEN, unique: true, type: 'text' })
  token!: string;

  @Column({ name: SESSION.TABLE_FIELDS.EXPIRES_AT })
  expiresAt!: Date;

  @Column({
    name: SESSION.TABLE_FIELDS.IP_ADDRESS,
    nullable: true,
    length: 45,
    type: 'varchar',
  })
  ipAddress?: string | null;

  @Column({
    name: SESSION.TABLE_FIELDS.USER_AGENT,
    nullable: true,
    type: 'text',
  })
  userAgent?: string | null;

  @ManyToOne(() => Usuario, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: SESSION.TABLE_FIELDS.ID_USUARIO })
  usuario!: Usuario;

  constructor(data: Partial<Session> = {}) {
    Object.assign(this, data);
  }
}
