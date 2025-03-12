import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { IconComponent, IconName } from '@web/shared/ui';

type Detail = {
  icon: IconName;
  label: string;
  value: string;
};

@Component({
  selector: 'nt-note-details-table',
  imports: [CommonModule, IconComponent],
  template: `
    <table class="text-preset-5 flex flex-col gap-4">
      @for (detail of details(); track detail.label) {
        <tr class="flex items-center">
          <td class="flex w-32 items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <nt-icon [name]="detail.icon" size="16" />
            <span>{{ detail.label }}</span>
          </td>
          <td class="dark:text-base-white text-neutral-950">{{ detail.value }}</td>
        </tr>
      }
    </table>
  `,
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailsTableComponent {
  private datePipe = inject(DatePipe);
  public tags = input<string[]>([]);
  public lastEdited = input<string>();
  protected details = computed<Array<{ icon: IconName; label: string; value: string }>>(
    () => {
      return [
        { icon: 'tag', label: 'Tags', value: this.tags().join(', ') },
        {
          icon: 'clock',
          label: 'Last edited',
          value: this.datePipe.transform(this.lastEdited()) || '',
        },
      ] satisfies Detail[];
    },
  );
}
