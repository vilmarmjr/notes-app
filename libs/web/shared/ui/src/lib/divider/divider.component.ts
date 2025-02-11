import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';

export const dividerVariants = cva('block bg-neutral-200 dark:bg-neutral-800', {
  variants: {
    direction: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
  },
});

export type DividerVariants = VariantProps<typeof dividerVariants>;

@Component({
  selector: 'n-divider',
  template: '',
  host: {
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  public direction = input<DividerVariants['direction']>('horizontal');
  protected computedClass = computed(() =>
    dividerVariants({ direction: this.direction() }),
  );
}
