import { computed, Directive, input } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'px-4 py-3 rounded-lg text-preset-4 transition-colors outline-4 outline-neutral-400 outline-offset-4 flex gap-2 justify-center items-center text-left disabled:bg-neutral-100 disabled:text-neutral-300 disabled:border-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-neutral-0 hover:bg-blue-700',
        secondary:
          'bg-neutral-100 text-neutral-600 border border-solid border-neutral-100  hover:border-neutral-300 hover:bg-neutral-0 hover:text-neutral-950',
        border:
          'bg-neutral-0 text-neutral-950 border border-solid border-neutral-300 hover:bg-neutral-100 hover:border-neutral-100 hover:text-neutral-600',
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
