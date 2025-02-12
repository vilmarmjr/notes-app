import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldComponent, InputDirective, LabelDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-email-field',
  imports: [CommonModule, FormFieldComponent, LabelDirective, InputDirective],
  template: `
    <nt-form-field>
      <span ntLabel>Email address</span>
      <input ntInput type="email" placeholder="email@example.com" />
    </nt-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFieldComponent {}
