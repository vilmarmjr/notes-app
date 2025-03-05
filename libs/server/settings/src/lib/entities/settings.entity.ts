import {
  ColorTheme,
  ColorThemes,
  DEFAULT_COLOR_THEME,
  DEFAULT_FONT_THEME,
  FontTheme,
  FontThemes,
} from '@common/models';
import { User } from '@server/shared/entities';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: FontThemes,
    default: DEFAULT_FONT_THEME,
    name: 'font_theme',
  })
  fontTheme!: FontTheme;

  @Column({
    type: 'enum',
    enum: ColorThemes,
    default: DEFAULT_COLOR_THEME,
    name: 'color_theme',
  })
  colorTheme!: ColorTheme;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
