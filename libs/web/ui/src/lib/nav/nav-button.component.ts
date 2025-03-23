import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
  selector: 'nt-nav-button',
  imports: [CommonModule, IconComponent],
  template: `
    <li>
      <button
        class="flex h-10 w-full items-center gap-2 rounded-lg px-3 text-neutral-700 enabled:hover:bg-neutral-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-neutral-400 dark:text-neutral-200 dark:enabled:hover:bg-neutral-800 dark:disabled:text-neutral-500"
        [disabled]="disabled()"
        (click)="buttonClick.emit($event)"
      >
        <nt-icon [name]="icon()" />
        <span class="text-preset-4">{{ label() }}</span>
      </button>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonComponent {
  public icon = input.required<IconName>();
  public label = input.required<string>();
  public disabled = input(false);
  public buttonClick = output<MouseEvent>();
}
