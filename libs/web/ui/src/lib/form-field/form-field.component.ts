import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
} from '@angular/core';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';
import { InputDirective } from '../input/input.directive';
import { ErrorDirective } from './error.directive';
import { HintDirective } from './hint.directive';
import { LabelDirective } from './label.directive';
import { PrefixDirective } from './prefix.directive';
import { SuffixDirective } from './suffix.directive';

export type FormFieldBottomPosition = 'fixed' | 'dynamic';

const inputContainerVariants = cva(
  'flex h-11 items-center gap-2 rounded-lg border px-4 py-3 outline-2 outline-offset-2 outline-neutral-500 focus-within:outline',
  {
    variants: {
      disabled: {
        false: 'hover:bg-neutral-50 dark:hover:bg-neutral-900',
        true: 'bg-neutral-50 dark:bg-neutral-700',
      },
      error: {
        false:
          'border-neutral-300 focus-within:border-neutral-950 dark:border-neutral-600 dark:focus-within:border-base-white',
        true: 'border-red-500',
      },
    },
  },
);

@Component({
  selector: 'nt-form-field',
  imports: [CommonModule],
  host: {
    '[class]': 'computedClass()',
  },
  template: `
    <label [attr.for]="input().id" class="flex flex-col gap-2">
      @if (label()) {
        <ng-content select="[ntLabel]" />
      }
      <div [class]="inputContainerClass()">
        @if (prefix()) {
          <ng-content select="[ntPrefix]" />
        }
        <ng-content select="input[ntInput]" />
        @if (suffix()) {
          <ng-content select="[ntSuffix]" />
        }
      </div>
    </label>
    @switch (bottomPosition()) {
      @case ('fixed') {
        <div class="flex min-h-4">
          <ng-container [ngTemplateOutlet]="bottomContent" />
        </div>
      }
      @case ('dynamic') {
        <ng-container [ngTemplateOutlet]="bottomContent" />
      }
    }
    <ng-template #bottomContent>
      @if (input().hasError() && error()) {
        <ng-content select="[ntError]" />
      } @else if (hint()) {
        <ng-content select="[ntHint]" />
      }
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  protected label = contentChild(LabelDirective);
  protected hint = contentChild(HintDirective);
  protected error = contentChild(ErrorDirective);
  protected prefix = contentChild(PrefixDirective);
  protected suffix = contentChild(SuffixDirective);
  protected input = contentChild.required(InputDirective);
  protected inputContainerClass = computed(() =>
    inputContainerVariants({
      disabled: this.input().disabled(),
      error: this.input().hasError(),
    }),
  );
  public bottomPosition = input<FormFieldBottomPosition>('dynamic');
  public userClass = input<string>('', { alias: 'class' });
  protected computedClass = computed(() =>
    ntMerge('flex flex-col gap-2', this.userClass()),
  );

  constructor() {
    effect(() => {
      const hint = this.hint();
      const prefix = this.prefix();
      const suffix = this.suffix();
      const isDisabled = this.input().disabled();

      hint?.setDisabledState(isDisabled);
      prefix?.setDisabledState(isDisabled);
      suffix?.setDisabledState(isDisabled);
    });
  }
}
