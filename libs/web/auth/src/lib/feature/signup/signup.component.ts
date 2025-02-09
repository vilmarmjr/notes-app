import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  DividerComponent,
  IconComponent,
  ThemeService,
} from '@web/shared/ui';
import { EmailFieldComponent } from '../../ui/email-field/email-field.component';
import { PasswordFieldComponent } from '../../ui/password-field/password-field.component';

@Component({
  selector: 'n-signup',
  imports: [
    CommonModule,
    ButtonDirective,
    DividerComponent,
    RouterLink,
    IconComponent,
    NgOptimizedImage,
    PasswordFieldComponent,
    EmailFieldComponent,
  ],
  template: `
    <div
      class="flex h-full w-full items-center justify-center bg-neutral-100 p-4 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
    >
      <div
        class="bg-neutral-0 flex w-full max-w-[540px] flex-col items-center rounded-xl border border-neutral-200 p-12 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none"
      >
        <img
          [ngSrc]="
            theme() === 'dark' ? 'assets/img/logo-dark.svg' : 'assets/img/logo-light.svg'
          "
          height="28"
          width="96"
          alt="Notes App Logo"
          class="mb-4"
        />
        <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
          Create your account
        </h1>
        <p class="text-preset-5 mb-10 text-center">
          Sign up to start organizing your notes and boost your productivity.
        </p>
        <form class="mb-4 flex w-full flex-col gap-4">
          <n-email-field />
          <n-password-field hint="At least 8 characters" />
          <button nButton type="submit">Sign up</button>
        </form>
        <n-divider class="mb-6" />
        <p class="text-preset-5 mb-4">Or log in with:</p>
        <button nButton variant="border" class="mb-4 w-full">
          <n-icon name="google" />
          Google
        </button>
        <n-divider class="mb-4" />
        <p class="text-preset-5">
          Already have an account?
          <a
            class="dark:text-base-white text-neutral-950 hover:underline"
            routerLink="/login"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private _themeService = inject(ThemeService);

  protected theme = this._themeService.theme;
}
