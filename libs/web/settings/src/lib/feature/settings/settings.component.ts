import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'n-settings',
  imports: [CommonModule],
  template: `
    <p>Settings works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
