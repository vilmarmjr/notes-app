import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BreakpointService } from '@web/shared/ui';
import { map } from 'rxjs';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { NotesDesktopComponent } from '../notes-desktop/notes-desktop.component';
import { NotesMobileComponent } from '../notes-mobile/notes-mobile.component';

@Component({
  selector: 'nt-notes-shell',
  imports: [
    CommonModule,
    NoteEditorComponent,
    NotesDesktopComponent,
    NotesMobileComponent,
  ],
  template: `
    @if (lg()) {
      <nt-notes-desktop />
    } @else if (noteId()) {
      <nt-note-editor />
    } @else {
      <nt-notes-mobile />
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
