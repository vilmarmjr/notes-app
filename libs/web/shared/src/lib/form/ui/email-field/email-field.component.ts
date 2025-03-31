import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormFieldModule, InputDirective } from '@web/ui';
import { InfoErrorComponent } from '../info-error/info-error.component';

@Component({
  selector: 'nt-email-field',
  imports: [
    CommonModule,
    FormFieldModule,
    InputDirective,
    ReactiveFormsModule,
    InfoErrorComponent,
  ],
  template: `
    <nt-form-field bottomPosition="fixed">
      <span ntLabel>Email address</span>
      <input
        ntInput
        type="email"
        placeholder="email@example.com"
        data-testid="email-input"
        [formControl]="control"
      />
      @if (control.errors) {
        <nt-info-error ntError>
          @if (control.hasError('required')) {
            This field is required
          } @else if (control.hasError('email')) {
            Please enter a valid email address
          }
        </nt-info-error>
      }
    </nt-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFieldComponent implements ControlValueAccessor, OnInit {
  protected control = new FormControl<string | null>(null);
  protected onChange = () => {};
  protected onTouched = () => {};

  private ngControl = inject(NgControl, { self: true, optional: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (this.ngControl) {
      this.control = this.ngControl.control as FormControl;
    }
  }

  writeValue() {}

  registerOnChange() {}

  registerOnTouched() {}
}
