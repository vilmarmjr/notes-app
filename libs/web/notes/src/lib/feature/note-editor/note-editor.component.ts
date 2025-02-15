import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  BreakpointService,
  ButtonDirective,
  DividerComponent,
  IconComponent,
  IconName,
} from '@web/shared/ui';
import { NoteActionsComponent } from '../../ui/note-actions/note-actions.component';

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
    NoteActionsComponent,
    IconComponent,
    ButtonDirective,
  ],
  template: `
    <div class="flex h-full min-h-0 w-full">
      <div class="flex flex-1 flex-col gap-4 px-6 py-5">
        <h1 class="text-preset-1 dark:text-base-white text-neutral-950">
          React Performance Optimization
        </h1>
        <table class="text-preset-5 flex flex-col gap-4">
          @for (detail of details; track detail.label) {
            <tr class="flex items-center">
              <td
                class="flex w-32 items-center gap-2 text-neutral-700 dark:text-neutral-300"
              >
                <nt-icon [name]="detail.icon" size="16" />
                <span>{{ detail.label }}</span>
              </td>
              <td class="dark:text-base-white text-neutral-950">{{ detail.value }}</td>
            </tr>
          }
        </table>
        <nt-divider />
        <textarea
          [value]="noteContent()"
          class="bg-base-white h-full w-full resize-none text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
        ></textarea>
        @if (lg()) {
          <nt-divider />
          <div class="flex gap-4">
            <button ntButton>Save note</button>
            <button ntButton variant="secondary">Cancel</button>
          </div>
        }
      </div>
      <nt-divider direction="vertical" />
      @if (lg()) {
        <nt-note-actions />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent {
  private breakpointService = inject(BreakpointService);
  protected lg = this.breakpointService.lg;

  protected details = [
    { icon: 'tag', label: 'Tags', value: 'Dev, React' },
    { icon: 'clock', label: 'Last edited', value: '29 Oct 2024' },
  ] satisfies Array<{ icon: IconName; label: string; value: string }>;

  protected noteContent = signal(noteContent);
}
