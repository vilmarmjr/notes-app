import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LogoComponent } from '@web/core';
import { EmailFieldComponent } from '@web/shared';
import { ButtonDirective } from '@web/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';

@Component({
  selector: 'nt-forgot-password',
  imports: [
    CommonModule,
    ButtonDirective,
    EmailFieldComponent,
    LogoComponent,
    AuthContainerComponent,
  ],
  template: `
    <nt-auth-container>
      <nt-logo class="mb-4" />
      <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
        Forgotten your password?
      </h1>
      <p class="text-preset-5 mb-10 text-center">
        Enter your email below, and we'll send you a link to reset it.
      </p>
      <form class="flex w-full flex-col gap-2">
        <nt-email-field />
        <button ntButton type="submit">Send reset link</button>
      </form>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {}
