import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@web/shared/ui';

@Component({
  selector: 'n-notes',
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="flex flex-col gap-3 w-[180px] p-3">
      <button nButton variant="primary">Primary button</button>
      <button nButton variant="primary" [disabled]="true">Primary button</button>
      <button nButton variant="secondary">Secondary button</button>
      <button nButton variant="secondary" [disabled]="true">Secondary button</button>
      <button nButton variant="border">Border button</button>
      <button nButton variant="border" [disabled]="true">Border button</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {}
