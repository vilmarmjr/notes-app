import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-note-aside-actions',
  imports: [CommonModule, ButtonDirective, IconComponent],
  template: `
    <div class="flex w-64 flex-col gap-3 px-4 py-5">
      @if (showArchive()) {
        <button ntButton variant="border" class="justify-start">
          <nt-icon name="archive" />
          Archive note
        </button>
      }
      @if (showRestore()) {
        <button ntButton variant="border" class="justify-start">
          <nt-icon name="restore" />
          Restore note
        </button>
      }
      @if (showDelete()) {
        <button ntButton variant="border" class="justify-start">
          <nt-icon name="delete" />
          Delete note
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteAsideActionsComponent {
  public showArchive = input(false);
  public showRestore = input(false);
  public showDelete = input(false);
}
