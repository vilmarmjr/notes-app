import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  OnDestroy,
  untracked,
} from '@angular/core';
import { FontTheme, FontThemes } from '@common/models';
import { ThemeStore, toUiFontTheme } from '@web/shared/theme';
import {
  ButtonDirective,
  FontThemeService,
  IconComponent,
  IconName,
  RadioModule,
} from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

type Option = {
  label: string;
  description: string;
  icon: IconName;
  value: FontTheme;
};

@Component({
  selector: 'nt-font-theme',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    RadioModule,
    IconComponent,
    ButtonDirective,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header title="Font theme" description="Choose your font theme:" />
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
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontThemeComponent implements OnDestroy {
  private _themeStore = inject(ThemeStore);
  private _fontThemeService = inject(FontThemeService);

  protected value = model(this._themeStore.originalFontTheme());

  protected canSave = computed(() => {
    const isSaving = this._themeStore.isSavingFontTheme();
    const hasChangedValue = this._themeStore.originalFontTheme() !== this.value();
    return !isSaving && hasChangedValue;
  });

  protected options: Option[] = [
    {
      label: 'Sans-serif',
      description: 'Clean and modern, easy to read.',
      icon: 'fontSansSerif',
      value: FontThemes.SANS_SERIF,
    },
    {
      label: 'Serif',
      description: 'Classic and elegant for a timeless feel.',
      icon: 'fontSerif',
      value: FontThemes.SERIF,
    },
    {
      label: 'Monospace',
      description: 'Code-like, great for a technical vibe.',
      icon: 'fontMonospace',
      value: FontThemes.MONOSPACE,
    },
  ];

  constructor() {
    effect(() => {
      const theme = this._themeStore.originalFontTheme();
      untracked(() => this.value.set(theme));
    });

    effect(() => this._fontThemeService.setTheme(toUiFontTheme(this.value())));
  }

  ngOnDestroy(): void {
    const originalTheme = toUiFontTheme(this._themeStore.originalFontTheme());

    if (originalTheme !== this._fontThemeService.theme()) {
      this._fontThemeService.setTheme(originalTheme);
    }
  }

  protected submit() {
    this._themeStore.saveFontTheme(this.value());
  }
}
