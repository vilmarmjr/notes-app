import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-color-theme',
  imports: [CommonModule],
  template: `
    <p>color-theme works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorThemeComponent {}
