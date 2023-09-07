import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './roles.entity';
import { Profile } from './profile.entity';
import { Posts } from './posts.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: "roleId" })
  roles: Role;

  @OneToOne(() => Profile)
  @JoinColumn({ name: "profileId" })
  profile: Profile;

  @OneToMany(() => Posts, (posts) => posts.users)
  posts: Posts[];
}
