import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormFieldModule, IconComponent, InputDirective } from '@web/shared/ui';
import { MATCH_OTHER_VALIDATOR_KEY } from '../../validators/match-other.validator';
import { InfoErrorComponent } from '../info-error/info-error.component';

@Component({
  selector: 'nt-password-field',
  imports: [
    CommonModule,
    IconComponent,
    RouterLink,
    FormFieldModule,
    InputDirective,
    ReactiveFormsModule,
    InfoErrorComponent,
  ],
  template: `
    <nt-form-field bottomPosition="fixed">
      <div ntLabel class="flex justify-between">
        <span>{{ label() }}</span>
        @if (showForgotLink()) {
          <a
            class="text-preset-6 text-neutral-600 underline hover:text-blue-500 dark:text-neutral-400"
            routerLink="/forgot-password"
            tabindex="-1"
          >
            Forgot
          </a>
        }
      </div>
      <input
        ntInput
        [type]="showPassword() ? 'text' : 'password'"
        [formControl]="control"
      />
      <nt-icon
        ntSuffix
        role="button"
        class="cursor-pointer"
        [name]="showPassword() ? 'hidePassword' : 'showPassword'"
        (click)="toggleShowPassword($event)"
      />
      @if (control.errors) {
        <nt-info-error ntError>
          @if (control.hasError('required')) {
            This field is required
          } @else if (control.hasError('minlength')) {
            Password must be at least
            {{ control.errors['minlength'].requiredLength }} characters
          } @else if (control.hasError(matchOtherKey)) {
            {{ matchOtherError() }}
          }
        </nt-info-error>
      }
      @if (hint()) {
        <div ntHint class="flex items-center gap-2">
          <nt-icon name="info" size="16" />
          <span>{{ hint() }}</span>
        </div>
      }
    </nt-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements ControlValueAccessor, OnInit {
  public label = input('Password');
  public showForgotLink = input(false);
  public hint = input('');
  public matchOtherError = input('Passwords do not match');
  protected showPassword = signal(false);

  protected matchOtherKey = MATCH_OTHER_VALIDATOR_KEY;

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

  protected toggleShowPassword(event: Event) {
    event.preventDefault();
    this.showPassword.update(show => !show);
  }
}
