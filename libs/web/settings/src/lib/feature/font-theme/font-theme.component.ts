import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-font-theme',
  imports: [CommonModule],
  template: `
    <p>font-theme works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontThemeComponent {}
