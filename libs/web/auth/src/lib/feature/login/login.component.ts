import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '@web/core/layout';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/shared/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';
import { EmailFieldComponent } from '../../ui/email-field/email-field.component';
import { PasswordFieldComponent } from '../../ui/password-field/password-field.component';

@Component({
  selector: 'nt-login',
  imports: [
    CommonModule,
    ButtonDirective,
    DividerComponent,
    RouterLink,
    IconComponent,
    LogoComponent,
    PasswordFieldComponent,
    EmailFieldComponent,
    AuthContainerComponent,
  ],
  template: `
    <nt-auth-container>
      <nt-logo class="mb-4" />
      <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
        Welcome to Notes
      </h1>
      <p class="text-preset-5 mb-10 text-center">Please log in to continue</p>
      <form class="mb-4 flex w-full flex-col gap-4">
        <nt-email-field />
        <nt-password-field [showForgotLink]="true" />
        <button ntButton type="submit">Log in</button>
      </form>
      <nt-divider class="mb-6" />
      <p class="text-preset-5 mb-4">Or log in with:</p>
      <button ntButton variant="border" class="mb-4 w-full">
        <nt-icon name="google" />
        Google
      </button>
      <nt-divider class="mb-4" />
      <p class="text-preset-5">
        No account yet?
        <a
          class="dark:text-base-white text-neutral-950 hover:underline"
          routerLink="/signup"
        >
          Sign up
        </a>
      </p>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
