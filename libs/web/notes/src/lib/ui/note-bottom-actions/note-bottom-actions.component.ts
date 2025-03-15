import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-note-bottom-actions',
  imports: [CommonModule, ButtonDirective],
  template: `
    <div class="flex gap-4">
      <button ntButton type="submit">Save note</button>
      <button ntButton variant="secondary" type="button">Cancel</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteBottomActionsComponent {
  public disableSave = input(false);
  public disableCancel = input(false);
}
