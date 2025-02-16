import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-color-theme',
  imports: [CommonModule, SettingsShellComponent],
  template: `
    <nt-settings-shell>
      <p>color-theme works!</p>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeComponent {}
