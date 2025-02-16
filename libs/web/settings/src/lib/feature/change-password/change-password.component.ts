import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';
@Component({
  selector: 'nt-change-password',
  imports: [CommonModule, SettingsShellComponent],
  template: `
    <nt-settings-shell>
      <p>change-password works!</p>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {}
