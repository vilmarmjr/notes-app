import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'text-preset-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-left outline-4 outline-offset-4 outline-neutral-400 transition-colors disabled:cursor-not-allowed disabled:border-none disabled:bg-neutral-100 disabled:text-neutral-300',
  {
    variants: {
      variant: {
        primary: 'text-neutral-0 bg-blue-500 hover:bg-blue-700',
        secondary:
          'hover:bg-neutral-0 border border-solid border-neutral-100 bg-neutral-100 text-neutral-600 hover:border-neutral-300 hover:text-neutral-950',
        border:
          'bg-neutral-0 border border-solid border-neutral-300 text-neutral-950 hover:border-neutral-100 hover:bg-neutral-100 hover:text-neutral-600',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[nButton]',
  host: {
    '[class]': 'computedClass()',
  },
})
export class ButtonDirective {
  public variant = input<ButtonVariants['variant']>('primary');
  protected computedClass = computed(() => buttonVariants({ variant: this.variant() }));
}
