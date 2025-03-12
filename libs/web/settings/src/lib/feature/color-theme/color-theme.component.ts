import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  untracked,
} from '@angular/core';
import { ColorTheme, ColorThemes } from '@common/models';
import { ThemeStore, toUiColorTheme } from '@web/shared/theme';
import {
  ButtonDirective,
  ColorThemeService,
  IconComponent,
  IconName,
  RadioModule,
} from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsContainerComponent } from '../settings-container/settings-container.component';

type Option = {
  label: string;
  description: string;
  icon: IconName;
  value: ColorTheme;
};

@Component({
  selector: 'nt-color-theme',
  imports: [
    CommonModule,
    SettingsContainerComponent,
    SettingsHeaderComponent,
    RadioModule,
    IconComponent,
    ButtonDirective,
  ],
  template: `
    <nt-settings-container>
      <nt-settings-header title="Color theme" description="Choose your color theme:" />
      <form class="flex max-w-[520px] flex-col gap-6">
        <nt-radio-group [(value)]="value">
          @for (option of options; track option.value) {
            <nt-radio-button [value]="option.value">
              <nt-icon ntRadioButtonIcon [name]="option.icon" />
              <ng-container ntRadioButtonLabel>{{ option.label }}</ng-container>
              <ng-container ntRadioButtonDescription>
                {{ option.description }}
              </ng-container>
            </nt-radio-button>
          }
        </nt-radio-group>
        <div class="flex justify-end">
          <button ntButton type="button" [disabled]="!canSave()" (click)="submit()">
            Apply changes
          </button>
        </div>
      </form>
    </nt-settings-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeComponent implements OnDestroy {
  private _themeStore = inject(ThemeStore);
  private _colorThemeService = inject(ColorThemeService);

  protected value = signal(this._themeStore.originalColorTheme());

  protected canSave = computed(() => {
    const isSaving = this._themeStore.isSavingColorTheme();
    const hasChangedValue = this._themeStore.originalColorTheme() !== this.value();
    return !isSaving && hasChangedValue;
  });

  protected options: Option[] = [
    {
      label: 'Light mode',
      description: 'Pick a clean and classic light theme',
      icon: 'sun',
      value: ColorThemes.LIGHT,
    },
    {
      label: 'Dark mode',
      description: 'Select a sleek and modern dark theme',
      icon: 'moon',
      value: ColorThemes.DARK,
    },
    {
      label: 'System',
      description: "Adapts to your device's theme",
      icon: 'systemTheme',
      value: ColorThemes.SYSTEM,
    },
  ];

  constructor() {
    effect(() => {
      const theme = this._themeStore.originalColorTheme();
      untracked(() => this.value.set(theme));
    });

    effect(() => this._colorThemeService.setTheme(toUiColorTheme(this.value())));
  }

  ngOnDestroy(): void {
    const originalTheme = toUiColorTheme(this._themeStore.originalColorTheme());

    if (originalTheme !== this._colorThemeService.theme()) {
      this._colorThemeService.setTheme(originalTheme);
    }
  }

  protected submit() {
    this._themeStore.saveColorTheme(this.value());
  }
}
