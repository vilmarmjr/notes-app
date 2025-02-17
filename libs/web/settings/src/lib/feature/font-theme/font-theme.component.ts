import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-font-theme',
  imports: [CommonModule, SettingsShellComponent, SettingsHeaderComponent],
  template: `
    <nt-settings-shell>
      <nt-settings-header title="Font theme" description="Choose your font theme:" />
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontThemeComponent {}
