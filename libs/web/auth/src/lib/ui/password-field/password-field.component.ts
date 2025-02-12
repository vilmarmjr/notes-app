import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormFieldComponent,
  HintDirective,
  IconComponent,
  InputDirective,
  LabelDirective,
  SuffixDirective,
} from '@web/shared/ui';

@Component({
  selector: 'nt-password-field',
  imports: [
    CommonModule,
    FormFieldComponent,
    IconComponent,
    InputDirective,
    LabelDirective,
    RouterLink,
    SuffixDirective,
    HintDirective,
  ],
  template: `
    <nt-form-field>
      <div ntLabel class="flex justify-between">
        <span>{{ label() }}</span>
        @if (showForgotLink()) {
          <a
            class="text-preset-6 text-neutral-600 underline dark:text-neutral-400"
            routerLink="/forgot-password"
          >
            Forgot
          </a>
        }
      </div>
      <input ntInput [type]="showPassword() ? 'text' : 'password'" />
      <nt-icon
        ntSuffix
        class="cursor-pointer"
        role="button"
        [name]="showPassword() ? 'hidePassword' : 'showPassword'"
        (click)="toggleShowPassword($event)"
      />
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
export class PasswordFieldComponent {
  public label = input('Password');
  public showForgotLink = input(false);
  public hint = input('');
  protected showPassword = signal(false);

  protected toggleShowPassword(event: Event) {
    event.preventDefault();
    this.showPassword.update(show => !show);
  }
}
