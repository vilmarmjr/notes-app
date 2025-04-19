import { ColorTheme, ColorThemes, FontTheme, FontThemes } from '@common/models';
import { BaseEntity, User } from '@server/shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('settings')
export class Settings extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FontThemes,
    name: 'font_theme',
    nullable: true,
  })
  fontTheme!: FontTheme | null;

  @Column({
    type: 'enum',
    enum: ColorThemes,
    name: 'color_theme',
    nullable: true,
  })
  colorTheme!: ColorTheme | null;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
