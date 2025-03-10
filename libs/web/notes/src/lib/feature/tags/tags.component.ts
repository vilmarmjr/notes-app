import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TagsListComponent, TagsStore } from '@web/shared/tags';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { CreateNoteButtonComponent } from '../../ui/create-note-button/create-note-button.component';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';

@Component({
  selector: 'nt-tags',
  imports: [
    CommonModule,
    NotesHeaderComponent,
    DividerComponent,
    TagsListComponent,
    CreateNoteButtonComponent,
  ],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col overflow-y-auto">
        <nt-notes-header type="tags" [showSearch]="false" />
        <nt-divider />
        <div class="px-8 py-6">
          <nt-tags-list
            [withDivider]="true"
            [tags]="store.tags()"
            [isLoading]="store.isLoadingTags()"
          />
        </div>
      </div>
      <nt-create-note-button class="fixed bottom-8 right-8" />
    } @else {
      <h1 class="text-preset-1 dark:text-base-white mb-4 text-neutral-950">Tags</h1>
      <nt-tags-list
        [withDivider]="true"
        [tags]="store.tags()"
        [isLoading]="store.isLoadingTags()"
      />
      <nt-create-note-button class="fixed bottom-20 right-5 sm:bottom-28 sm:right-8" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
  protected store = inject(TagsStore);
  protected lg = inject(BreakpointService).lg;
}
