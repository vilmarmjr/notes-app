import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationError } from '@common/models';
import { LogoComponent, SessionService } from '@web/core';
import {
  AuthService,
  EmailFieldComponent,
  errorMessages,
  PasswordFieldComponent,
} from '@web/shared';
import { ButtonDirective, DividerComponent, IconComponent, ToastService } from '@web/ui';
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
      <h1 class="mb-2 text-preset-1 text-neutral-950 dark:text-base-white">
        Welcome to Notes
      </h1>
      <p class="mb-10 text-center text-preset-5">Please log in to continue</p>
      <form
        class="mb-4 flex w-full flex-col gap-2"
        [formGroup]="form"
        (ngSubmit)="logIn()"
      >
        <nt-email-field formControlName="email" />
        <nt-password-field formControlName="password" [showForgotLink]="true" />
        <button
          ntButton
          type="submit"
          data-testid="login-button"
          [disabled]="form.invalid || isSubmitting()"
        >
          Log in
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
        No account yet?
        <a
          class="text-neutral-950 hover:text-blue-500 dark:text-base-white"
          routerLink="/signup"
          data-testid="signup-link"
        >
          Sign up
        </a>
      </p>
    </nt-auth-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  protected isSubmitting = signal(false);
  protected form = this.fb.group({
    email: this.fb.nonNullable.control('', [Validators.email, Validators.required]),
    password: this.fb.nonNullable.control('', [Validators.required]),
  });

  ngOnInit(): void {
    this.handleError();
  }

  protected logIn() {
    const { email, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this.authService
      .logIn({ email, password })
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

  private handleError() {
    const error = this.route.snapshot.queryParams['error'];

    if (!error) return;

    const errorMessage = errorMessages[error as ApplicationError];

    if (!errorMessage) return;

    this.toastService.error(errorMessage);
    this.router.navigate(['/login']);
  }
}
