import { ColorTheme, ColorThemes } from '@common/models';
import { ColorTheme as UiColorTheme } from '@web/ui';

const colorThemeMap: Record<UiColorTheme, ColorTheme> = {
  dark: ColorThemes.DARK,
  light: ColorThemes.LIGHT,
  system: ColorThemes.SYSTEM,
};

export function toColorTheme(theme: UiColorTheme) {
  return colorThemeMap[theme];
}
