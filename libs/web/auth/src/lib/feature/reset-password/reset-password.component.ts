import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PASSWORD_MIN_LENGTH } from '@common/constants';
import { LogoComponent } from '@web/core/layout';
import { PasswordFieldComponent } from '@web/shared/form';
import { ButtonDirective } from '@web/shared/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';

@Component({
  selector: 'nt-reset-password',
  imports: [
    CommonModule,
    LogoComponent,
    ButtonDirective,
    PasswordFieldComponent,
    AuthContainerComponent,
  ],
  template: `
    <nt-auth-container>
      <nt-logo class="mb-4" />
      <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
        Reset your password
      </h1>
      <p class="text-preset-5 mb-10 text-center">
        Choose a new password to secure your account.
      </p>
      <form class="flex w-full flex-col gap-2">
        <nt-password-field label="New password" [hint]="passwordHint" />
        <nt-password-field label="Confirm new password" />
        <button ntButton type="submit">Reset password</button>
      </form>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  protected readonly passwordHint = `At least ${PASSWORD_MIN_LENGTH} characters`;
}
