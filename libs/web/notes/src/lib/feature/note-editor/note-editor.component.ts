import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { NoteAsideActionsComponent } from '../../ui/note-aside-actions/note-aside-actions.component';
import { NoteBottomActionsComponent } from '../../ui/note-bottom-actions/note-bottom-actions.component';
import { NoteDetailsTableComponent } from '../../ui/note-details-table/note-details-table.component';

const noteContent = `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization
`;

@Component({
  selector: 'nt-note-editor',
  imports: [
    CommonModule,
    DividerComponent,
    NoteAsideActionsComponent,
    NoteBottomActionsComponent,
    NoteDetailsTableComponent,
  ],
  template: `
    <div class="flex h-full min-h-0 w-full">
      <div class="flex flex-1 flex-col gap-4 lg:px-6 lg:py-5">
        <h1 class="text-preset-1 dark:text-base-white text-neutral-950">
          React Performance Optimization
        </h1>
        <nt-note-details-table />
        <nt-divider />
        <textarea
          [value]="noteContent()"
          class="bg-base-white h-full w-full resize-none text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
        ></textarea>
        @if (lg()) {
          <nt-divider />
          <nt-note-bottom-actions />
        }
      </div>
      @if (lg()) {
        <nt-divider direction="vertical" />
        <nt-note-aside-actions />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent {
  private breakpointService = inject(BreakpointService);
  protected lg = this.breakpointService.lg;
  protected noteContent = signal(noteContent);
}
