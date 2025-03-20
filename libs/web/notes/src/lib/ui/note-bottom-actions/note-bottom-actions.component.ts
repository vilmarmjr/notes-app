import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-note-bottom-actions',
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="flex gap-4">
      <button ntButton type="submit" [disabled]="disableSave()">Save note</button>
      <button
        ntButton
        variant="border"
        type="button"
        [disabled]="disableCancel()"
        (click)="cancelChanges.emit()"
      >
        Cancel
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteBottomActionsComponent {
  public disableSave = input(false);
  public disableCancel = input(false);
  public cancelChanges = output();
}
