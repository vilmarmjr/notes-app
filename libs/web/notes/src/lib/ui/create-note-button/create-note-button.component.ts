import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-create-note-button',
  imports: [CommonModule, IconComponent, RouterLink],
  template: `
    <button
      class="text-base-white flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-700 sm:h-14 sm:w-14"
      routerLink="/notes"
      [queryParams]="{ note: 'new' }"
    >
      <nt-icon name="plus" size="28" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteButtonComponent {
  public small = input(false);
}
