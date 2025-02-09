import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
} from '@angular/core';
import { cva } from 'class-variance-authority';
import { InputDirective } from '../input/input.directive';
import { ErrorDirective } from './error.directive';
import { HintDirective } from './hint.directive';
import { LabelDirective } from './label.directive';
import { PrefixDirective } from './prefix.directive';
import { SuffixDirective } from './suffix.directive';

const inputContainerVariants = cva(
  'flex h-11 gap-2 rounded-lg border px-4 py-3 outline-2 outline-offset-2 outline-neutral-500 focus-within:outline',
  {
    variants: {
      disabled: {
        false: 'hover:bg-neutral-50 dark:hover:bg-neutral-900',
        true: 'bg-neutral-50',
      },
      error: {
        false:
          'dark:focus-within:border-base-white border-neutral-300 focus-within:border-neutral-950 dark:border-neutral-600',
        true: 'border-red-500',
      },
    },
  },
);

@Component({
  selector: 'n-form-field',
  imports: [CommonModule],
  host: {
    class: 'flex flex-col gap-2',
  },
  template: `
    <label [attr.for]="input().id" class="flex flex-col gap-2">
      @if (label()) {
        <ng-content select="[nLabel]" />
      }
      <div [class]="inputContainerClass()">
        @if (prefix()) {
          <ng-content select="[nPrefix]" />
        }
        <ng-content select="input[nInput]" />
        @if (suffix()) {
          <ng-content select="[nSuffix]" />
        }
      </div>
    </label>
    @if (input().hasError() && error()) {
      <ng-content select="[nError]" />
    } @else if (hint()) {
      <ng-content select="[nHint]" />
    }
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

  constructor() {
    effect(() => {
      const hint = this.hint();

      if (hint) {
        hint.setDisabledState(this.input().disabled());
      }
    });
  }
}
