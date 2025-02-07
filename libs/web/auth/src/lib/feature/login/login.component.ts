import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  DividerComponent,
  FormFieldComponent,
  IconComponent,
  InputDirective,
  LabelDirective,
} from '@web/shared/ui';

@Component({
  selector: 'n-login',
  imports: [
    CommonModule,
    FormFieldComponent,
    InputDirective,
    ButtonDirective,
    LabelDirective,
    DividerComponent,
    RouterLink,
    IconComponent,
  ],
  template: `
    <div class="flex h-full w-full items-center justify-center bg-neutral-100 p-4">
      <div
        class="bg-neutral-0 flex w-full max-w-[540px] flex-col items-center rounded-xl border border-neutral-200 p-12 shadow-lg"
      >
        <img src="assets/img/logo.svg" alt="Notes App Logo" class="mb-4" />
        <h1 class="text-preset-1 mb-2 text-neutral-950">Welcome to Notes</h1>
        <p class="text-preset-5 mb-10 text-neutral-600">Please log in to continue</p>
        <form class="mb-4 flex w-full flex-col gap-4">
          <n-form-field>
            <span nLabel>Email Address</span>
            <input nInput type="email" placeholder="email@example.com" />
          </n-form-field>
          <n-form-field>
            <span nLabel>Password</span>
            <input nInput type="password" />
          </n-form-field>
          <button nButton type="submit">Log in</button>
        </form>
        <n-divider class="mb-6" />
        <p class="text-preset-5 mb-4 text-neutral-600">Or log in with:</p>
        <button nButton variant="border" class="mb-4 w-full">
          <n-icon name="google" />
          Google
        </button>
        <n-divider class="mb-4" />
        <p class="text-preset-5 text-neutral-600">
          No account yet?
          <a class="text-neutral-950 hover:underline" routerLink="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
