import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutShellComponent } from '@web/core/layout';
import { NotesStore } from '../../store/notes.store';

@Component({
  selector: 'nt-notes-shell',
  imports: [LayoutShellComponent],
  template: `
    <nt-layout-shell (scrollEnd)="store.loadNextPage()" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotesStore],
})
export class NotesShellComponent {
  protected store = inject(NotesStore);
}
