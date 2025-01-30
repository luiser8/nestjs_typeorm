import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pre_registration' })
export class PreRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  extension: string;

  @Column()
  career: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class PreRegistrationCreateResponse {
  data: PreRegistration;
  message: string;
  success: boolean;
  status: number;
}
