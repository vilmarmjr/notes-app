import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective, DialogModule, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-delete-note-dialog',
  imports: [CommonModule, IconComponent, ButtonDirective, DialogModule],
  host: {
    class: 'w-full',
  },
  template: `
    <div class="flex gap-4 p-5">
      <nt-dialog-icon>
        <nt-icon name="delete" />
      </nt-dialog-icon>
      <div class="flex flex-col gap-1">
        <h2 ntDialogTitle>Delete note</h2>
        <p ntDialogText>
          Are you sure you want to permanently delete this note? This action cannot be
          undone.
        </p>
      </div>
    </div>
    <nt-dialog-footer>
      <button
        ntButton
        ntDialogClose
        variant="border"
        type="button"
        [disabled]="isSaving()"
      >
        Cancel
      </button>
      <button
        ntButton
        variant="warn"
        type="button"
        [disabled]="isSaving()"
        (click)="delete.emit()"
      >
        Delete note
      </button>
    </nt-dialog-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteNoteDialogComponent {
  public isSaving = input(false);
  public delete = output();
}
