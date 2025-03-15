import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreakpointService,
  DividerComponent,
  EditableTextDirective,
} from '@web/shared/ui';
import { NotesStore } from '../../store/notes.store';
import { NoteAsideActionsComponent } from '../../ui/note-aside-actions/note-aside-actions.component';
import { NoteBottomActionsComponent } from '../../ui/note-bottom-actions/note-bottom-actions.component';
import { NoteDetailsTableComponent } from '../../ui/note-details-table/note-details-table.component';
import { NoteEditorSkeletonComponent } from '../../ui/note-editor-skeleton/note-editor-skeleton.component';
import { NoteTopActionsComponent } from '../../ui/note-top-actions/note-top-actions.component';

@Component({
  selector: 'nt-note-editor',
  imports: [
    CommonModule,
    DividerComponent,
    NoteAsideActionsComponent,
    NoteTopActionsComponent,
    NoteBottomActionsComponent,
    NoteDetailsTableComponent,
    NoteEditorSkeletonComponent,
    EditableTextDirective,
    ReactiveFormsModule,
  ],
  template: `
    @let note = store.selectedNote();
    @let noteId = store.noteId();
    <div class="flex h-full min-h-0 w-full">
      <form
        [formGroup]="form()"
        class="flex flex-1 flex-col gap-4 lg:px-6 lg:py-5"
        (ngSubmit)="onSubmit()"
      >
        @if (!lg() && noteId) {
          <nt-note-top-actions
            [showArchive]="!!note && !note.archived"
            [showRestore]="!!note && note.archived"
            [showDelete]="!!note"
          />
          <nt-divider />
        }
        @if (store.isLoadingSelectedNote()) {
          <nt-note-editor-skeleton />
        } @else if (noteId) {
          <h1 ntEditableText formControlName="title" class="text-preset-1">
            Enter a title...
          </h1>
          <nt-note-details-table
            [lastEdited]="note?.updatedAt"
            [tagsControl]="form().controls.tags"
            (tagsChange)="onTagsChange($event)"
          />
          <nt-divider />
          <textarea
            placeholder="Start typing your note here..."
            formControlName="content"
            class="bg-base-white h-full w-full resize-none text-neutral-800 placeholder-neutral-400 outline-0 dark:bg-neutral-950 dark:text-neutral-100"
          ></textarea>
        }
        @if (lg() && !store.isLoadingSelectedNote() && noteId) {
          <nt-divider />
          <nt-note-bottom-actions
            [disableSave]="store.isSavingChanges()"
            [disableCancel]="store.isSavingChanges()"
          />
        }
      </form>
      @if (lg() && !store.isLoadingSelectedNote() && noteId) {
        <nt-divider direction="vertical" />
        <nt-note-aside-actions
          [showArchive]="!!note && !note.archived"
          [showRestore]="!!note && note.archived"
          [showDelete]="!!note"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent {
  private breakpointService = inject(BreakpointService);
  private fb = inject(FormBuilder);
  protected store = inject(NotesStore);
  protected lg = this.breakpointService.lg;
  protected form = computed(() => {
    const note = this.store.selectedNote();
    return this.fb.group({
      title: this.fb.nonNullable.control(note?.title || '', [Validators.required]),
      content: this.fb.nonNullable.control(note?.content || ''),
      tags: this.fb.nonNullable.control(note?.tags.join(', ') || ''),
    });
  });

  protected onTagsChange(tags: string) {
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
    this.form().controls.tags.setValue(tagsArray.join(', '));
  }

  protected onSubmit() {
    const { title, content, tags } = this.form().getRawValue();
    const tagsToSave = tags.split(', ').filter(Boolean);
    const body = { title, content, tags: tagsToSave };

    if (this.store.isCreatingNewNote()) {
      this.store.createNote(body);
    } else {
      this.store.updateNote({ ...body, id: this.store.noteId() });
    }
  }
}
