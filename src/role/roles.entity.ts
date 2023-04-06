import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  ceratedAt: Date;
}
