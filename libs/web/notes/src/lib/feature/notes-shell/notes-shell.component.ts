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
  private _breakpointService = inject(BreakpointService);
  private _activatedRoute = inject(ActivatedRoute);
  private _noteId = this._activatedRoute.queryParamMap.pipe(
    map(params => params.get('note')),
  );
  protected noteId = toSignal(this._noteId);
  protected lg = this._breakpointService.lg;
}
