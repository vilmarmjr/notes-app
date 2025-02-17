import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent, RadioModule } from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-color-theme',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    RadioModule,
    IconComponent,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header
        title="Color theme"
        description="Choose your color theme:"
        class="mb-6 block"
      />
      <nt-radio-group class="block max-w-[520px]">
        <nt-radio-button>
          <nt-icon ntRadioButtonIcon name="sun" />
          <ng-container ntRadioButtonLabel>Light mode</ng-container>
          <ng-container ntRadioButtonDescription>
            Pick a clean and classic light theme
          </ng-container>
        </nt-radio-button>
        <nt-radio-button>
          <nt-icon ntRadioButtonIcon name="moon" />
          <ng-container ntRadioButtonLabel>Dark mode</ng-container>
          <ng-container ntRadioButtonDescription>
            Select a sleek and modern dark theme
          </ng-container>
        </nt-radio-button>
        <nt-radio-button>
          <nt-icon ntRadioButtonIcon name="systemTheme" />
          <ng-container ntRadioButtonLabel>System</ng-container>
          <ng-container ntRadioButtonDescription>
            Adapts to your device’s theme
          </ng-container>
        </nt-radio-button>
      </nt-radio-group>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeComponent {}
