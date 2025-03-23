import { ColorTheme, ColorThemes } from '@common/models';
import { ColorTheme as UiColorTheme } from '@web/ui';

const colorThemeMap: Record<ColorTheme, UiColorTheme> = {
  [ColorThemes.DARK]: 'dark',
  [ColorThemes.LIGHT]: 'light',
  [ColorThemes.SYSTEM]: 'system',
};

export function toUiColorTheme(theme: ColorTheme) {
  return colorThemeMap[theme];
}
