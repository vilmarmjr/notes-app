import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'notes-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<Theme>('light');
  public readonly theme = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const theme = this._theme();
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem(THEME_KEY, theme);
    });
  }

  setInitialTheme(): void {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;

    if (savedTheme === 'light') {
      return this._theme.set('light');
    }

    if (
      savedTheme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return this._theme.set('dark');
    }
  }

  toggleTheme(): void {
    this._theme.update(theme => (theme === 'light' ? 'dark' : 'light'));
  }
}
