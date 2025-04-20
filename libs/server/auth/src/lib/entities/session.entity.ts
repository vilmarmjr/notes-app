import { BaseEntity, User } from '@server/shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('sessions')
export class Session extends BaseEntity {
  @Column({ type: 'varchar', length: 512, name: 'refresh_token' })
  refreshToken!: string;

  @Column({ type: 'varchar', length: 512, nullable: true, name: 'one_time_token' })
  oneTimeToken!: string | null;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
