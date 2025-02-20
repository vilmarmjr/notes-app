import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nt-auth-container',
  imports: [CommonModule],
  template: `
    <div
      class="flex min-h-full w-full items-center justify-center overflow-y-auto bg-neutral-100 p-4 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
    >
      <div
        class="bg-neutral-0 flex w-full max-w-[540px] flex-col items-center rounded-xl border border-neutral-200 px-4 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-12 dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
      >
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthContainerComponent {}
