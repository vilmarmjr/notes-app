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
    <div class="h-full w-full bg-neutral-100 flex items-center justify-center p-4">
      <div
        class="w-full max-w-[540px] bg-neutral-0 p-12 flex flex-col items-center border border-neutral-200 rounded-xl shadow-lg"
      >
        <img src="assets/img/logo.svg" alt="Notes App Logo" class="mb-4" />
        <h1 class="text-preset-1 text-neutral-950 mb-2">Welcome to Notes</h1>
        <p class="text-preset-5 text-neutral-600 mb-10">Please log in to continue</p>
        <form class="w-full flex flex-col gap-4 mb-4">
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
        <p class="text-preset-5 text-neutral-600 mb-4">Or log in with:</p>
        <button nButton variant="border" class="w-full mb-4">
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
