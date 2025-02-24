import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormFieldModule, InputDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-email-field',
  imports: [CommonModule, FormFieldModule, InputDirective, ReactiveFormsModule],
  template: `
    <nt-form-field>
      <span ntLabel>Email address</span>
      <input
        ntInput
        type="email"
        placeholder="email@example.com"
        [formControl]="control"
      />
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
