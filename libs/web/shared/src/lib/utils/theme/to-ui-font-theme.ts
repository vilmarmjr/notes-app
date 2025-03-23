import { FontTheme, FontThemes } from '@common/models';
import { FontTheme as UiFontTheme } from '@web/ui';

const fontThemeMap: Record<FontTheme, UiFontTheme> = {
  [FontThemes.MONOSPACE]: 'monospace',
  [FontThemes.SANS_SERIF]: 'sansSerif',
  [FontThemes.SERIF]: 'serif',
};

export function toUiFontTheme(theme: FontTheme) {
  return fontThemeMap[theme];
}
