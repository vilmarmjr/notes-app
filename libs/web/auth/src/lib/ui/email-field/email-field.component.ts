import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent, InputDirective, LabelDirective } from '@web/shared/ui';

@Component({
  selector: 'n-email-field',
  imports: [CommonModule, FormFieldComponent, LabelDirective, InputDirective],
  template: `
    <n-form-field>
      <span nLabel>Email Address</span>
      <input nInput type="email" placeholder="email@example.com" />
    </n-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFieldComponent {}
