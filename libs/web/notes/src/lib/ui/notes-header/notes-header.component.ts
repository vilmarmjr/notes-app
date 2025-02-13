import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldModule, IconComponent, InputDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-notes-header',
  imports: [CommonModule, FormFieldModule, InputDirective, IconComponent],
  template: `
    <header class="flex h-20 items-center justify-between px-8">
      <h1 class="text-preset-1 dark:text-base-white text-neutral-950">All notes</h1>
      <div class="flex items-center gap-4">
        <nt-form-field class="w-72">
          <nt-icon ntPrefix name="search" class="text-neutral-500" />
          <input ntInput placeholder="Search by title, content, or tags..." />
        </nt-form-field>
        <button
          class="flex h-11 w-11 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <nt-icon name="settings" size="24" />
        </button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesHeaderComponent {}
