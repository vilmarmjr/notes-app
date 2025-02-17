import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { generateRadioButtonId } from './generate-radio-button-id';
import { RadioButtonDescriptionDirective } from './radio-button-description.directive';
import { RadioButtonIconDirective } from './radio-button-icon.directive';
import { RadioButtonLabelDirective } from './radio-button-label.directive';

@Component({
  selector: 'nt-radio-button',
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-4 rounded-xl border border-neutral-200 p-4">
      <label class="flex w-full items-center gap-4" [for]="id">
        @if (icon()) {
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200"
          >
            <ng-content select="[ntRadioButtonIcon]" />
          </div>
        }
        <div class="mr-auto flex flex-col gap-1">
          <span class="text-preset-4 text-neutral-950">
            <ng-content select="[ntRadioButtonLabel]" />
          </span>
          @if (description()) {
            <span class="text-preset-6 text-neutral-700">
              <ng-content select="[ntRadioButtonDescription]" />
            </span>
          }
        </div>
      </label>
      <input
        type="radio"
        [id]="id"
        [value]="value()"
        class="h-4 w-4 border-gray-300 bg-gray-100 text-red-500"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent<T> {
  public value = input<T>();
  protected id = generateRadioButtonId();
  protected icon = contentChild(RadioButtonIconDirective);
  protected label = contentChild.required(RadioButtonLabelDirective);
  protected description = contentChild(RadioButtonDescriptionDirective);
}
