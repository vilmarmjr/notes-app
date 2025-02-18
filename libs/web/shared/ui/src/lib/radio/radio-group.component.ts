import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { generateRadioGroupId } from './generate-radio-group-id';

type ChangeFn<T = unknown> = (value: T) => void;
type TouchFn<T = unknown> = (value: T) => void;

export type RadioGroupChangeEvent<T = unknown> = {
  value: T;
};

@Component({
  selector: 'nt-radio-group',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  template: `
    <fieldset class="flex flex-col gap-4">
      <ng-content />
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent<T = unknown> implements ControlValueAccessor {
  public readonly id = generateRadioGroupId();
  public readonly value = model<T>();
  public readonly valueChange = output<RadioGroupChangeEvent<T>>();

  protected onChange: ChangeFn<T> = () => {};
  protected onTouched: TouchFn<T> = () => {};

  writeValue(value: T) {
    this.value.set(value);
  }

  registerOnChange(fn: ChangeFn<T>) {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchFn<T>) {
    this.onTouched = fn;
  }

  select(value: T) {
    if (value === this.value()) return;

    this.value.set(value);
    this.onChange(value);
    this.valueChange.emit({ value });
  }
}
