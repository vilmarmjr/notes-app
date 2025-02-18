import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { generateRadioButtonId } from './generate-radio-button-id';
import { RadioButtonDescriptionDirective } from './radio-button-description.directive';
import { RadioButtonIconDirective } from './radio-button-icon.directive';
import { RadioButtonLabelDirective } from './radio-button-label.directive';
import { RadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'nt-radio-button',
  imports: [CommonModule],
  template: `
    <label
      class="flex cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 p-4 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 [&:has(input:checked)]:bg-neutral-100 [&:has(input:checked)]:dark:bg-neutral-800"
      [for]="id"
    >
      @if (icon()) {
        <div
          class="bg-base-white dark:text-base-white flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-950 dark:border-neutral-700 dark:bg-neutral-950"
        >
          <ng-content select="[ntRadioButtonIcon]" />
        </div>
      }
      <div class="mr-auto flex flex-col gap-1">
        <span class="text-preset-4 dark:text-base-white text-neutral-950">
          <ng-content select="[ntRadioButtonLabel]" />
        </span>
        @if (description()) {
          <span class="text-preset-6 text-neutral-700 dark:text-neutral-300">
            <ng-content select="[ntRadioButtonDescription]" />
          </span>
        }
      </div>
      <input
        #input
        class="h-4 w-4 flex-shrink-0 appearance-none rounded-full border-2 border-neutral-200 checked:border-4 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:border-neutral-600 dark:focus:ring-offset-neutral-800"
        type="radio"
        [id]="id"
        [value]="value()"
        [name]="radioGroup?.id"
        [checked]="checked()"
      />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent<T> {
  public value = input<T>();
  public checked = input(false);
  protected id = generateRadioButtonId();
  protected icon = contentChild(RadioButtonIconDirective);
  protected label = contentChild.required(RadioButtonLabelDirective);
  protected description = contentChild(RadioButtonDescriptionDirective);
  protected radioGroup = inject(RadioGroupComponent, { optional: true, host: true });
}
