import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { generateRadioGroupId } from './generate-radio-group-id';

@Component({
  selector: 'nt-radio-group',
  imports: [CommonModule],
  template: `
    <fieldset class="flex flex-col gap-4">
      <ng-content />
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent {
  public readonly id = generateRadioGroupId();
}
