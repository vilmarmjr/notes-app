import { computed, effect, Injectable, signal } from '@angular/core';

export type ColorTheme = 'light' | 'dark' | 'system';

const themes: ColorTheme[] = ['light', 'dark', 'system'];
const themeKey = 'notes-color-theme';
const defaultTheme: ColorTheme = 'system';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private _theme = signal<ColorTheme>(defaultTheme);
  public readonly theme = this._theme.asReadonly();
  public readonly isDarkTheme = computed(() => {
    const theme = this._theme();
    return (
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDarkTheme());
      localStorage.setItem(themeKey, this._theme());
    });
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem(themeKey) as ColorTheme | null;
    const theme = savedTheme || defaultTheme;

    if (themes.includes(theme)) {
      this._theme.set(theme);
    }
  }

  setTheme(theme: ColorTheme) {
    return this._theme.set(theme);
  }
}
