import { effect, inject } from '@angular/core';
import { ColorTheme, FontTheme } from '@common/models';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SettingsService } from '@web/shared/data-access';
import { ColorThemeService, FontThemeService, ToastService } from '@web/shared/ui';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { toColorTheme } from '../utils/to-color-theme';
import { toFontTheme } from '../utils/to-font-theme';
import { toUiColorTheme } from '../utils/to-ui-color-theme';
import { toUiFontTheme } from '../utils/to-ui-font-theme';

export const ThemeStore = signalStore(
  withState(() => {
    const _colorThemeService = inject(ColorThemeService);
    const _fontThemeService = inject(FontThemeService);
    return {
      originalColorTheme: toColorTheme(_colorThemeService.theme()),
      originalFontTheme: toFontTheme(_fontThemeService.theme()),
      isSavingColorTheme: false,
      isSavingFontTheme: false,
    };
  }),
  withMethods(
    (
      _store,
      _settingsService = inject(SettingsService),
      _toastService = inject(ToastService),
    ) => ({
      loadTheme: rxMethod<void>(
        pipe(
          switchMap(() => _settingsService.getSettings()),
          tap(({ colorTheme, fontTheme }) => {
            patchState(_store, {
              originalColorTheme: colorTheme ?? _store.originalColorTheme(),
              originalFontTheme: fontTheme ?? _store.originalFontTheme(),
            });
          }),
        ),
      ),
      saveColorTheme: rxMethod<ColorTheme>(
        pipe(
          tap(() => patchState(_store, { isSavingColorTheme: true })),
          tap(() => _toastService.success('Settings updated successfully!')),
          switchMap(colorTheme =>
            _settingsService.saveColorTheme({ colorTheme }).pipe(
              tap(() => patchState(_store, { originalColorTheme: colorTheme })),
              finalize(() => patchState(_store, { isSavingColorTheme: false })),
            ),
          ),
        ),
      ),
      saveFontTheme: rxMethod<FontTheme>(
        pipe(
          tap(() => patchState(_store, { isSavingFontTheme: true })),
          tap(() => _toastService.success('Settings updated successfully!')),
          switchMap(fontTheme =>
            _settingsService.saveFontTheme({ fontTheme }).pipe(
              tap(() => patchState(_store, { originalFontTheme: fontTheme })),
              finalize(() => patchState(_store, { isSavingFontTheme: false })),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks(
    (
      _store,
      _colorThemeService = inject(ColorThemeService),
      _fontThemeService = inject(FontThemeService),
    ) => ({
      onInit() {
        effect(() =>
          _colorThemeService.setTheme(toUiColorTheme(_store.originalColorTheme())),
        );
        effect(() =>
          _fontThemeService.setTheme(toUiFontTheme(_store.originalFontTheme())),
        );
      },
    }),
  ),
);
