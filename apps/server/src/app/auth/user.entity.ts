import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255, nullable: false })
  email: string;

  @Column({ nullable: false, length: 255 })
  password: string;
}
