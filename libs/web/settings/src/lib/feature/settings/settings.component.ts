import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-settings',
  imports: [CommonModule, SettingsShellComponent],
  template: `
    <nt-settings-shell [withMenu]="false">
      <p>settings works!</p>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
