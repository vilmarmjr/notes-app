import { SignInMethod, SignInMethods } from '@common/models';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({
    type: 'enum',
    enum: SignInMethods,
    name: 'sign_in_method',
  })
  signInMethod!: SignInMethod;
}
