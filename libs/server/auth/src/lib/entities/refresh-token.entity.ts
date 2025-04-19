import { BaseEntity, User } from '@server/shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  token!: string;

  @Column({ type: 'varchar', length: 512, nullable: true, name: 'one_time_token' })
  oneTimeToken!: string | null;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
