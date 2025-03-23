import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '@web/core';
import { AuthService, EmailFieldComponent, PasswordFieldComponent } from '@web/shared';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';

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
    ReactiveFormsModule,
  ],
  template: `
    <nt-auth-container>
      <nt-logo class="mb-4" />
      <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
        Welcome to Notes
      </h1>
      <p class="text-preset-5 mb-10 text-center">Please log in to continue</p>
      <form
        class="mb-4 flex w-full flex-col gap-2"
        [formGroup]="form"
        (ngSubmit)="logIn()"
      >
        <nt-email-field formControlName="email" />
        <nt-password-field formControlName="password" [showForgotLink]="true" />
        <button ntButton type="submit" [disabled]="form.invalid || isSubmitting()">
          Log in
        </button>
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
          class="dark:text-base-white text-neutral-950 hover:text-blue-500"
          routerLink="/signup"
        >
          Sign up
        </a>
      </p>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected isSubmitting = signal(false);
  protected form = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.email, Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  protected logIn() {
    const { email, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.authService
      .logIn({ email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/']))
      .add(() => this.isSubmitting.set(false));
  }
}
