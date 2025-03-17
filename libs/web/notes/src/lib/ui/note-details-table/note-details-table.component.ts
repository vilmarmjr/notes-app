import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditableTextDirective, IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-note-details-table',
  imports: [CommonModule, IconComponent, EditableTextDirective, ReactiveFormsModule],
  template: `
    <table class="text-preset-5 flex flex-col gap-4">
      <tr class="flex items-center">
        <td
          class="flex w-32 shrink-0 items-center gap-2 text-neutral-700 dark:text-neutral-300"
        >
          <nt-icon name="tag" size="16" />
          <span>Tags</span>
        </td>
        <td
          ntEditableText
          class="flex-auto"
          [formControl]="tagsControl()"
          (blurChange)="tagsChange.emit($event)"
        >
          Add tags separated by commas (e.g. Work, Planning)
        </td>
      </tr>
      @if (archived()) {
        <tr class="flex items-center">
          <td
            class="flex w-32 shrink-0 items-center gap-2 text-neutral-700 dark:text-neutral-300"
          >
            <nt-icon name="status" size="16" />
            <span>Status</span>
          </td>
          <td>Archived</td>
        </tr>
      }
      <tr class="flex items-center">
        <td
          class="flex w-32 shrink-0 items-center gap-2 text-neutral-700 dark:text-neutral-300"
        >
          <nt-icon name="clock" size="16" />
          <span>Last edited</span>
        </td>
        <td [class.text-neutral-400]="!lastEdited()">
          {{ (lastEdited() | date) || 'Not yet saved' }}
        </td>
      </tr>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailsTableComponent {
  public tagsControl = input.required<FormControl<string>>();
  public lastEdited = input<string>();
  public archived = input(false);
  public tagsChange = output<string>();
}
