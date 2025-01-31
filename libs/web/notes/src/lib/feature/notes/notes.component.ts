import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@web/shared/ui';

@Component({
  selector: 'n-notes',
  imports: [CommonModule, ButtonComponent],
  template: `
    <p>Notes works!</p>
    <n-button>Primary Button</n-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {}
