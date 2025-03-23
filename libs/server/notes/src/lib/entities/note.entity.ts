import { BaseEntity, User } from '@server/shared';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity('notes')
export class Note extends BaseEntity {
  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ default: false })
  archived!: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Tag, tag => tag.note, { cascade: true })
  tags!: Tag[];
}
