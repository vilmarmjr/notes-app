import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  FontTheme,
  FontThemeService,
  IconComponent,
  IconName,
  RadioGroupChangeEvent,
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
    ReactiveFormsModule,
    ButtonDirective,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header title="Font theme" description="Choose your font theme:" />
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
export class FontThemeComponent {
  private _fb = inject(FormBuilder);
  private _fontThemeService = inject(FontThemeService);

  protected form = this._fb.group({
    theme: this._fb.nonNullable.control(this._fontThemeService.theme()),
  });

  protected options: Option[] = [
    {
      label: 'Sans-serif',
      description: 'Clean and modern, easy to read.',
      icon: 'fontSansSerif',
      value: 'sansSerif',
    },
    {
      label: 'Serif',
      description: 'Classic and elegant for a timeless feel.',
      icon: 'fontSerif',
      value: 'serif',
    },
    {
      label: 'Monospace',
      description: 'Code-like, great for a technical vibe.',
      icon: 'fontMonospace',
      value: 'monospace',
    },
  ];

  protected onThemeChange(event: RadioGroupChangeEvent<FontTheme>) {
    this._fontThemeService.setTheme(event.value);
  }
}
