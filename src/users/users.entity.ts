import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../role/roles.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  ceratedAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @Column()
  token: string;

  @OneToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  roles: Role;
}
