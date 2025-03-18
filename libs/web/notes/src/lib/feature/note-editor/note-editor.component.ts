import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  BreakpointService,
  DialogModule,
  DividerComponent,
  EditableTextDirective,
} from '@web/shared/ui';
import { debounceTime, filter, mergeMap } from 'rxjs';
import { NotesStore } from '../../store/notes.store';
import { ArchiveNoteDialogComponent } from '../../ui/archive-note-dialog/archive-note-dialog.component';
import { NoteAsideActionsComponent } from '../../ui/note-aside-actions/note-aside-actions.component';
import { NoteBottomActionsComponent } from '../../ui/note-bottom-actions/note-bottom-actions.component';
import { NoteDetailsTableComponent } from '../../ui/note-details-table/note-details-table.component';
import { NoteEditorSkeletonComponent } from '../../ui/note-editor-skeleton/note-editor-skeleton.component';
import { NoteTopActionsComponent } from '../../ui/note-top-actions/note-top-actions.component';
import { fromTagsArray, toTagsArray } from '../../utils/tags.util';

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
    DialogModule,
    ArchiveNoteDialogComponent,
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
            (archiveNote)="store.setArchiveDialogOpened(true)"
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
            [archived]="!!note?.archived"
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
          (archiveNote)="store.setArchiveDialogOpened(true)"
        />
      }
    </div>
    <ng-template
      [ntShowDialog]="store.isArchiveNoteDialogOpen()"
      (ntShowDialogChange)="store.setArchiveDialogOpened($event)"
      [width]="440"
    >
      <nt-archive-note-dialog
        [isSaving]="store.isArchivingNote()"
        (archive)="store.archiveNote()"
      />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent implements OnInit {
  private breakpointService = inject(BreakpointService);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  protected store = inject(NotesStore);
  protected lg = this.breakpointService.lg;
  protected form = computed(() => {
    const isCreatingNewNote = this.store.isCreatingNewNote();
    const selectedNote = this.store.selectedNote();
    return untracked(() => {
      const note = isCreatingNewNote ? this.store.unsavedNote() : selectedNote;
      return this.fb.group({
        title: this.fb.nonNullable.control(note?.title || '', [Validators.required]),
        content: this.fb.nonNullable.control(note?.content || ''),
        tags: this.fb.nonNullable.control(fromTagsArray(note?.tags || [])),
      });
    });
  });
  private form$ = toObservable(this.form);

  ngOnInit() {
    this.form$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(() => this.store.isCreatingNewNote()),
        mergeMap(form => form.valueChanges.pipe(debounceTime(500))),
      )
      .subscribe(({ title, content, tags }) =>
        this.store.updateUnsavedNote({
          title: title || '',
          content: content || '',
          tags: toTagsArray(tags || ''),
        }),
      );
  }

  protected onTagsChange(tags: string) {
    const tagsArray = toTagsArray(tags);
    this.form().controls.tags.setValue(fromTagsArray(tagsArray));
  }

  protected onSubmit() {
    const { title, content, tags } = this.form().getRawValue();
    const dto = { title, content, tags: toTagsArray(tags) };

    if (this.store.isCreatingNewNote()) {
      this.store.createNote(dto);
    } else {
      this.store.updateNote({ ...dto, id: this.store.noteId() });
    }
  }
}
