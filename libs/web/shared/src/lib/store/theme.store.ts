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
import { ColorThemeService, FontThemeService, ToastService } from '@web/ui';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { SettingsService } from '../data-access/settings.service';
import { toColorTheme } from '../utils/theme/to-color-theme';
import { toFontTheme } from '../utils/theme/to-font-theme';
import { toUiColorTheme } from '../utils/theme/to-ui-color-theme';
import { toUiFontTheme } from '../utils/theme/to-ui-font-theme';

export const ThemeStore = signalStore(
  withState(() => {
    const colorThemeService = inject(ColorThemeService);
    const fontThemeService = inject(FontThemeService);
    return {
      originalColorTheme: toColorTheme(colorThemeService.theme()),
      originalFontTheme: toFontTheme(fontThemeService.theme()),
      isSavingColorTheme: false,
      isSavingFontTheme: false,
    };
  }),
  withMethods(
    (
      store,
      settingsService = inject(SettingsService),
      toastService = inject(ToastService),
    ) => ({
      loadTheme: rxMethod<void>(
        pipe(
          switchMap(() => settingsService.getSettings()),
          tap(({ colorTheme, fontTheme }) => {
            patchState(store, {
              originalColorTheme: colorTheme ?? store.originalColorTheme(),
              originalFontTheme: fontTheme ?? store.originalFontTheme(),
            });
          }),
        ),
      ),
      saveColorTheme: rxMethod<ColorTheme>(
        pipe(
          tap(() => patchState(store, { isSavingColorTheme: true })),
          switchMap(colorTheme =>
            settingsService.saveColorTheme({ colorTheme }).pipe(
              tap(() => patchState(store, { originalColorTheme: colorTheme })),
              tap(() => toastService.success('Settings updated successfully!')),
              finalize(() => patchState(store, { isSavingColorTheme: false })),
            ),
          ),
        ),
      ),
      saveFontTheme: rxMethod<FontTheme>(
        pipe(
          tap(() => patchState(store, { isSavingFontTheme: true })),
          switchMap(fontTheme =>
            settingsService.saveFontTheme({ fontTheme }).pipe(
              tap(() => patchState(store, { originalFontTheme: fontTheme })),
              tap(() => toastService.success('Settings updated successfully!')),
              finalize(() => patchState(store, { isSavingFontTheme: false })),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks(
    (
      store,
      colorThemeService = inject(ColorThemeService),
      fontThemeService = inject(FontThemeService),
    ) => ({
      onInit() {
        effect(() =>
          colorThemeService.setTheme(toUiColorTheme(store.originalColorTheme())),
        );
        effect(() => fontThemeService.setTheme(toUiFontTheme(store.originalFontTheme())));
      },
    }),
  ),
);
