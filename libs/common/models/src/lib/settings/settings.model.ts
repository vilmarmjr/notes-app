import { ColorTheme } from './color-theme.model';
import { FontTheme } from './font-theme.model';

export type SettingsResponseDto = {
  colorTheme?: ColorTheme | null;
  fontTheme?: FontTheme | null;
};
