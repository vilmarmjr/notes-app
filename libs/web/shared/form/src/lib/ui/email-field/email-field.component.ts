import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormFieldModule, IconComponent, InputDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-email-field',
  imports: [
    CommonModule,
    FormFieldModule,
    InputDirective,
    ReactiveFormsModule,
    IconComponent,
  ],
  template: `
    <nt-form-field bottomPosition="fixed">
      <span ntLabel>Email address</span>
      <input
        ntInput
        type="email"
        placeholder="email@example.com"
        [formControl]="control"
      />
      @if (control.errors) {
        <div ntError class="flex items-center gap-2">
          <nt-icon name="info" size="16" />
          @if (control.hasError('required')) {
            This field is required
          } @else if (control.hasError('email')) {
            Please enter a valid email address
          }
        </div>
      }
    </nt-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFieldComponent implements ControlValueAccessor, OnInit {
  protected control = new FormControl<string | null>(null);
  protected onChange = () => {};
  protected onTouched = () => {};

  private _ngControl = inject(NgControl, { self: true });

  constructor() {
    this._ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.control = this._ngControl.control as FormControl;
  }

  writeValue() {}

  registerOnChange() {}

  registerOnTouched() {}
}
