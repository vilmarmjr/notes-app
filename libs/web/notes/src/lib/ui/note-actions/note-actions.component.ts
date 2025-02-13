import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonDirective, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-note-actions',
  imports: [CommonModule, ButtonDirective, IconComponent],
  template: `
    <div class="flex w-64 flex-col gap-3 px-4 py-5">
      <button ntButton variant="border">
        <nt-icon name="archive" />
        Archive note
      </button>
      <button ntButton variant="border">
        <nt-icon name="delete" />
        Delete note
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteActionsComponent {}
