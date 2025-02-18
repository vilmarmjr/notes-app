import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  IconComponent,
  IconName,
  RadioGroupChangeEvent,
  RadioModule,
  Theme,
  ThemeService,
} from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

type Option = {
  label: string;
  description: string;
  icon: IconName;
  value: Theme;
};

@Component({
  selector: 'nt-color-theme',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    RadioModule,
    IconComponent,
    ReactiveFormsModule,
    ButtonDirective,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header title="Color theme" description="Choose your color theme:" />
      <form class="flex max-w-[520px] flex-col gap-6" [formGroup]="form">
        <nt-radio-group formControlName="theme" (valueChange)="onThemeChange($event)">
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
          <button ntButton>Apply changes</button>
        </div>
      </form>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeComponent {
  private _themeService = inject(ThemeService);
  private _fb = inject(FormBuilder);

  protected light: Theme = 'light';
  protected dark: Theme = 'dark';
  protected system: Theme = 'system';

  protected form = this._fb.group({
    theme: this._fb.nonNullable.control(this._themeService.theme()),
  });

  protected options: Option[] = [
    {
      label: 'Light mode',
      description: 'Pick a clean and classic light theme',
      icon: 'sun',
      value: 'light',
    },
    {
      label: 'Dark mode',
      description: 'Select a sleek and modern dark theme',
      icon: 'moon',
      value: 'dark',
    },
    {
      label: 'System',
      description: "Adapts to your device's theme",
      icon: 'systemTheme',
      value: 'system',
    },
  ];

  protected onThemeChange(event: RadioGroupChangeEvent<Theme>) {
    this._themeService.setTheme(event.value);
  }
}
