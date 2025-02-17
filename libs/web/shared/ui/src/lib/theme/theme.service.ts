import { computed, effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

const themes: Theme[] = ['light', 'dark', 'system'];
const themeKey = 'notes-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<Theme>('system');
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
    const savedTheme = localStorage.getItem(themeKey) as Theme | null;
    const theme = savedTheme || 'system';

    if (themes.includes(theme)) {
      this._theme.set(theme);
    }
  }

  setTheme(theme: Theme) {
    return this._theme.set(theme);
  }
}
