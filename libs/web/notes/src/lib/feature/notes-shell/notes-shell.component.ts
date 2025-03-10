import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesStore } from '../../store/notes.store';

@Component({
  selector: 'nt-notes-shell',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotesStore],
})
export class NotesShellComponent {}
