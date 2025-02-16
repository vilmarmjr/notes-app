import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'nt-desktop-header',
  imports: [CommonModule],
  template: `
    <header class="flex h-20 items-center justify-between px-8">
      <h1 class="text-preset-1 dark:text-base-white text-neutral-950">
        @if (title(); as title) {
          {{ title }}
        } @else {
          <ng-content select="[desktopHeaderTitle]" />
        }
      </h1>
      <ng-content select="[desktopHeaderActions]" />
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopHeaderComponent {
  public title = input<string | null>(null);
}
