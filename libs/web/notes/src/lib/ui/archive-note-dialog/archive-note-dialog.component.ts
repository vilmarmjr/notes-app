import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective, DialogModule, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-archive-note-dialog',
  imports: [CommonModule, IconComponent, ButtonDirective, DialogModule],
  template: `
    <div class="flex gap-4 p-5">
      <nt-dialog-icon>
        <nt-icon name="archive" />
      </nt-dialog-icon>
      <div class="flex flex-col gap-1">
        <h2 ntDialogTitle>Archive note</h2>
        <p ntDialogText>
          Are you sure you want to archive this note? You can find it in the Archived
          Notes section and restore it anytime.
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
        variant="primary"
        type="button"
        [disabled]="isSaving()"
        (click)="archive.emit()"
      >
        Archive note
      </button>
    </nt-dialog-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveNoteDialogComponent {
  public isSaving = input(false);
  public archive = output();
}
