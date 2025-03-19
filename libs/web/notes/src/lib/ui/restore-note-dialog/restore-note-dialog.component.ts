import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective, DialogModule, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-restore-note-dialog',
  imports: [CommonModule, IconComponent, ButtonDirective, DialogModule],
  host: {
    class: 'w-full',
  },
  template: `
    <div class="flex gap-4 p-5">
      <nt-dialog-icon>
        <nt-icon name="restore" />
      </nt-dialog-icon>
      <div class="flex flex-col gap-1">
        <h2 ntDialogTitle>Restore note</h2>
        <p ntDialogText>Are you sure you want to archive this note?</p>
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
        variant="primary"
        type="button"
        [disabled]="isSaving()"
        (click)="restore.emit()"
      >
        Restore note
      </button>
    </nt-dialog-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoreNoteDialogComponent {
  public isSaving = input(false);
  public restore = output();
}
