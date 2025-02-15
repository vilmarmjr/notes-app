import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BreakpointService } from '@web/shared/ui';
import { map } from 'rxjs';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'nt-notes-shell',
  imports: [CommonModule, NoteEditorComponent, NotesComponent],
  template: `
    @if (lg() || !noteId()) {
      <nt-notes />
    } @else {
      <nt-note-editor />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesShellComponent {
  private _noteId = inject(ActivatedRoute).queryParamMap.pipe(
    map(params => params.get('note')),
  );
  protected noteId = toSignal(this._noteId);
  protected lg = inject(BreakpointService).lg;
}
