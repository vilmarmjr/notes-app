import { effect, Injectable, signal } from '@angular/core';

export type FontTheme = 'sansSerif' | 'serif' | 'monospace';

const themes: FontTheme[] = ['sansSerif', 'serif', 'monospace'];
const themeKey = 'notes-font-theme';
const defaultTheme: FontTheme = 'sansSerif';

@Injectable({
  providedIn: 'root',
})
export class FontThemeService {
  private _theme = signal<FontTheme>(defaultTheme);
  public readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this._theme();
      document.documentElement.classList.toggle('font-sans', theme === 'sansSerif');
      document.documentElement.classList.toggle('font-serif', theme === 'serif');
      document.documentElement.classList.toggle('font-mono', theme === 'monospace');
      localStorage.setItem(themeKey, this._theme());
    });
  }

  setInitialTheme() {
    const savedTheme = localStorage.getItem(themeKey) as FontTheme | null;
    const theme = savedTheme || defaultTheme;

    if (themes.includes(theme)) {
      this._theme.set(theme);
    }
  }

  setTheme(theme: FontTheme) {
    return this._theme.set(theme);
  }
}
