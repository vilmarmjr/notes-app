import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '@web/core/layout';
import { ButtonDirective } from '@web/shared/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';
import { PasswordFieldComponent } from '../../ui/password-field/password-field.component';

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
      <form class="flex w-full flex-col gap-4">
        <nt-password-field label="New password" hint="At least 8 characters" />
        <nt-password-field label="Confirm new password" />
        <button ntButton type="submit">Reset password</button>
      </form>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {}
