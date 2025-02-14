import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BottomNavComponent, ContentComponent, HeaderComponent } from '@web/core/layout';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesListComponent } from '../../ui/notes-list/notes-list.component';

@Component({
  selector: 'nt-notes',
  imports: [
    CommonModule,
    HeaderComponent,
    ContentComponent,
    BottomNavComponent,
    CreateNoteButtonComponent,
    NotesListComponent,
  ],
  template: `
    <div class="flex h-full flex-col">
      <nt-header />
      <nt-content>
        <h1 class="text-preset-1 dark:text-base-white mb-4 text-neutral-950">
          All Notes
        </h1>
        <nt-notes-list />
        <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
      </nt-content>
      <nt-bottom-nav class="sticky bottom-0" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {}
