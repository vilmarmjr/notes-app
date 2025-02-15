import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent, IconName } from '@web/shared/ui';

@Component({
  selector: 'nt-note-details-table',
  imports: [CommonModule, IconComponent],
  template: `
    <table class="text-preset-5 flex flex-col gap-4">
      @for (detail of details; track detail.label) {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailsTableComponent {
  protected details = [
    { icon: 'tag', label: 'Tags', value: 'Dev, React' },
    { icon: 'clock', label: 'Last edited', value: '29 Oct 2024' },
  ] satisfies Array<{ icon: IconName; label: string; value: string }>;
}
