import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from './label.directive';
import { HintDirective } from './hint.directive';
import { cva } from 'class-variance-authority';
import { ErrorDirective } from './error.directive';
import { PrefixDirective } from './prefix.directive';
import { SuffixDirective } from './suffix.directive';

const inputContainerVariants = cva(
  'py-3 px-4 border rounded-lg outline-2 outline-offset-2 outline-neutral-500 focus-within:outline flex gap-2',
  {
    variants: {
      disabled: {
        false: 'hover:bg-neutral-50',
        true: 'bg-neutral-50',
      },
      error: {
        false: 'border-neutral-300 focus-within:border-neutral-950',
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
      @if(label()) {
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
