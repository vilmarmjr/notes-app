import { FontTheme, FontThemes } from '@common/models';
import { FontTheme as UiFontTheme } from '@web/shared/ui';

const fontThemeMap: Record<UiFontTheme, FontTheme> = {
  monospace: FontThemes.MONOSPACE,
  sansSerif: FontThemes.SANS_SERIF,
  serif: FontThemes.SERIF,
};

export function toFontTheme(theme: UiFontTheme) {
  return fontThemeMap[theme];
}
