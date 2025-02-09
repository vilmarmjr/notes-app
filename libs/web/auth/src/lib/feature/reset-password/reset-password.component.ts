import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonDirective, ThemeService } from '@web/shared/ui';
import { PasswordFieldComponent } from '../../ui/password-field/password-field.component';

@Component({
  selector: 'n-reset-password',
  imports: [CommonModule, NgOptimizedImage, ButtonDirective, PasswordFieldComponent],
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
          Reset your password
        </h1>
        <p class="text-preset-5 mb-10">Choose a new password to secure your account.</p>
        <form class="flex w-full flex-col gap-4">
          <n-password-field label="New password" hint="At least 8 characters" />
          <n-password-field label="Confirm new password" />
          <button nButton type="submit">Reset password</button>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  private _themeService = inject(ThemeService);

  protected theme = this._themeService.theme;
}
