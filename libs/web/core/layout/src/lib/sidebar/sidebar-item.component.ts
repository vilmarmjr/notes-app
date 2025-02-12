import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent, IconName } from '@web/shared/ui';
import { cva } from 'class-variance-authority';

const linkVariants = cva(
  'flex h-10 items-center gap-2 rounded-lg px-3 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
  {
    variants: {
      isSelected: {
        true: 'bg-neutral-100 text-neutral-950 dark:bg-neutral-800',
        false: 'text-neutral-700 dark:text-neutral-200',
      },
    },
  },
);

const iconVariants = cva('', {
  variants: {
    isSelected: {
      true: 'text-blue-500',
      false: '',
    },
  },
});

@Component({
  selector: 'nt-sidebar-item',
  imports: [CommonModule, IconComponent, RouterLink],
  template: `
    <li>
      <a [routerLink]="link()" [class]="linkClass()">
        <nt-icon [name]="icon()" [class]="iconClass()" />
        <span class="text-preset-4">{{ label() }}</span>
        @if (isSelected()) {
          <nt-icon name="chevronRight" size="24" class="ml-auto" />
        }
      </a>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  public readonly link = input.required<string>();
  public readonly icon = input.required<IconName>();
  public readonly label = input.required<string>();
  public readonly isSelected = input(false);
  protected readonly linkClass = computed(() =>
    linkVariants({ isSelected: this.isSelected() }),
  );
  protected readonly iconClass = computed(() =>
    iconVariants({ isSelected: this.isSelected() }),
  );
}
