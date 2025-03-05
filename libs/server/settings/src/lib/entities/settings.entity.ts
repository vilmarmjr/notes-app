import { ColorTheme, ColorThemes, FontTheme, FontThemes } from '@common/models';
import { User } from '@server/shared/entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: FontThemes,
    name: 'font_theme',
    nullable: true,
  })
  fontTheme!: FontTheme;

  @Column({
    type: 'enum',
    enum: ColorThemes,
    name: 'color_theme',
    nullable: true,
  })
  colorTheme!: ColorTheme;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
