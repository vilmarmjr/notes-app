import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ShellService } from '@web/core/layout';
import { BreakpointService } from '@web/shared/ui';
import { map } from 'rxjs';
import { NotesStore } from '../../store/notes.store';
import { NoteEditorComponent } from '../note-editor/note-editor.component';
import { NotesDesktopComponent } from '../notes-desktop/notes-desktop.component';
import { NotesMobileComponent } from '../notes-mobile/notes-mobile.component';

@Component({
  selector: 'nt-notes',
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
  providers: [NotesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  private shellService = inject(ShellService);
  private store = inject(NotesStore);
  protected noteId = toSignal(
    inject(ActivatedRoute).queryParamMap.pipe(map(params => params.get('note'))),
  );
  protected lg = inject(BreakpointService).lg;

  constructor() {
    this.shellService.scroll$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.store.loadNextPage());
  }
}
