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
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesStore } from '@web/shared';
import {
  BreakpointService,
  DialogModule,
  DividerComponent,
  EditableTextDirective,
} from '@web/ui';
import { debounceTime, filter, map, mergeMap, startWith, switchMap } from 'rxjs';
import { ArchiveNoteDialogComponent } from '../../ui/archive-note-dialog/archive-note-dialog.component';
import { DeleteNoteDialogComponent } from '../../ui/delete-note-dialog/delete-note-dialog.component';
import { NoteAsideActionsComponent } from '../../ui/note-aside-actions/note-aside-actions.component';
import { NoteBottomActionsComponent } from '../../ui/note-bottom-actions/note-bottom-actions.component';
import { NoteDetailsTableComponent } from '../../ui/note-details-table/note-details-table.component';
import { NoteEditorSkeletonComponent } from '../../ui/note-editor-skeleton/note-editor-skeleton.component';
import { NoteTopActionsComponent } from '../../ui/note-top-actions/note-top-actions.component';
import { RestoreNoteDialogComponent } from '../../ui/restore-note-dialog/restore-note-dialog.component';
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
    RestoreNoteDialogComponent,
    DeleteNoteDialogComponent,
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
            [disableSave]="disableSave()"
            [disableCancel]="disableCancel()"
            (archiveNote)="store.setArchiveDialogOpened(true)"
            (restoreNote)="store.setRestoreDialogOpened(true)"
            (deleteNote)="store.setDeleteDialogOpened(true)"
            (cancelChanges)="cancelChanges()"
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
            class="h-full w-full resize-none bg-base-white text-neutral-800 placeholder-neutral-400 outline-0 dark:bg-neutral-950 dark:text-neutral-100"
          ></textarea>
        }
        @if (lg() && !store.isLoadingSelectedNote() && noteId) {
          <nt-divider />
          <nt-note-bottom-actions
            [disableSave]="disableSave()"
            [disableCancel]="disableCancel()"
            (cancelChanges)="cancelChanges()"
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
          (restoreNote)="store.setRestoreDialogOpened(true)"
          (deleteNote)="store.setDeleteDialogOpened(true)"
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
    <ng-template
      [ntShowDialog]="store.isRestoreNoteDialogOpen()"
      (ntShowDialogChange)="store.setRestoreDialogOpened($event)"
      [width]="400"
    >
      <nt-restore-note-dialog
        [isSaving]="store.isRestoringNote()"
        (restore)="store.restoreNote()"
      />
    </ng-template>
    <ng-template
      [ntShowDialog]="store.isDeleteNoteDialogOpen()"
      (ntShowDialogChange)="store.setDeleteDialogOpened($event)"
      [width]="400"
    >
      <nt-delete-note-dialog
        [isSaving]="store.isDeletingNote()"
        (delete)="store.deleteNote()"
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
  private hasFormChanges = toSignal(
    this.form$.pipe(
      switchMap(form =>
        form.valueChanges.pipe(
          debounceTime(500),
          startWith(form.value),
          map(() => this.hasChangedFormValues()),
        ),
      ),
    ),
    { initialValue: false },
  );
  private isFormInvalid = toSignal(
    this.form$.pipe(
      switchMap(form =>
        form.statusChanges.pipe(debounceTime(500), startWith(form.status)),
      ),
      map(status => status === 'INVALID'),
    ),
    { initialValue: true },
  );
  protected disableSave = computed(
    () => this.isFormInvalid() || this.store.isSavingChanges(),
  );
  protected disableCancel = computed(
    () =>
      this.store.isSavingChanges() ||
      (!this.store.isCreatingNewNote() && !this.hasFormChanges()),
  );

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

  protected cancelChanges() {
    if (this.store.isCreatingNewNote()) {
      return this.store.cancelNewNote();
    }

    const selectedNote = this.store.selectedNote();

    if (!selectedNote) return;

    this.form().patchValue({
      title: selectedNote.title,
      content: selectedNote.content,
      tags: fromTagsArray(selectedNote.tags),
    });
  }

  private hasChangedFormValues() {
    const selectedNote = this.store.selectedNote();

    if (!selectedNote) return false;

    const { title, content, tags } = this.form().value;
    return (
      title !== selectedNote.title ||
      content !== selectedNote.content ||
      fromTagsArray(selectedNote.tags) !== tags
    );
  }
}
