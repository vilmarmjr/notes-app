import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-note-bottom-actions',
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="flex gap-4">
      <button ntButton>Save note</button>
      <button ntButton variant="secondary">Cancel</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteBottomActionsComponent {}
