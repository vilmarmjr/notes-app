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
import { PASSWORD_MIN_LENGTH } from '@common/models';
import { LogoComponent, SessionService } from '@web/core';
import { AuthService, EmailFieldComponent, PasswordFieldComponent } from '@web/shared';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/ui';
import { AuthContainerComponent } from '../../ui/auth-container/auth-container.component';

@Component({
  selector: 'nt-signup',
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
      <h1 class="mb-2 text-preset-1 text-neutral-950 dark:text-base-white">
        Create your account
      </h1>
      <p class="mb-10 text-center text-preset-5">
        Sign up to start organizing your notes and boost your productivity.
      </p>
      <form
        class="mb-4 flex w-full flex-col gap-2"
        [formGroup]="form"
        (ngSubmit)="signUp()"
      >
        <nt-email-field formControlName="email" />
        <nt-password-field [hint]="passwordHint" formControlName="password" />
        <button
          ntButton
          type="submit"
          data-testid="signup-button"
          [disabled]="form.invalid || isSubmitting()"
        >
          Sign up
        </button>
      </form>
      <nt-divider class="mb-6" />
      <p class="mb-4 text-preset-5">Or log in with:</p>
      <button
        ntButton
        variant="border"
        class="mb-4 w-full"
        data-testid="login-with-google-button"
        (click)="logInWithGoogle()"
      >
        <nt-icon name="google" />
        Google
      </button>
      <nt-divider class="mb-4" />
      <p class="text-preset-5">
        Already have an account?
        <a
          class="text-neutral-950 hover:text-blue-500 dark:text-base-white"
          data-testid="login-link"
          routerLink="/login"
        >
          Login
        </a>
      </p>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  protected isSubmitting = signal(false);
  protected form = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.email, Validators.required]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
    ]),
  });
  protected readonly passwordHint = `At least ${PASSWORD_MIN_LENGTH} characters`;

  protected signUp() {
    const { email, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.authService
      .signUp({ email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ accessToken }) => {
        this.sessionService.setAccessToken(accessToken);
        this.router.navigate(['/']);
      })
      .add(() => this.isSubmitting.set(false));
  }

  protected logInWithGoogle() {
    this.authService.logInWithGoogle();
  }
}
