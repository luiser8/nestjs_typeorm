import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    photo?: string;
}
