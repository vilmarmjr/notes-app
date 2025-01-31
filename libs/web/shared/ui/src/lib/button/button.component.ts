import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'n-button',
  imports: [CommonModule],
  template: `
    <button
      class="bg-blue-500 px-4 py-3 rounded-lg text-neutral-0 hover:bg-blue-700 transition-all text-preset-4"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
