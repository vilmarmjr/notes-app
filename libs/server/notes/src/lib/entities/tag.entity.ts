import { BaseEntity } from '@server/shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Note } from './note.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ length: 255 })
  name!: string;

  @ManyToOne(() => Note, note => note.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'note_id' })
  note!: Note;
}
