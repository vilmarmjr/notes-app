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
import { LogoComponent } from '@web/core/layout';
import { AuthService } from '@web/shared/data-access';
import { EmailFieldComponent, PasswordFieldComponent } from '@web/shared/form';
import { ButtonDirective, DividerComponent, IconComponent } from '@web/shared/ui';
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
      <h1 class="text-preset-1 dark:text-base-white mb-2 text-neutral-950">
        Create your account
      </h1>
      <p class="text-preset-5 mb-10 text-center">
        Sign up to start organizing your notes and boost your productivity.
      </p>
      <form
        class="mb-4 flex w-full flex-col gap-2"
        [formGroup]="form"
        (ngSubmit)="signUp()"
      >
        <nt-email-field formControlName="email" />
        <nt-password-field hint="At least 8 characters" formControlName="password" />
        <button ntButton type="submit" [disabled]="form.invalid || isSubmitting()">
          Sign up
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
        Already have an account?
        <a
          class="dark:text-base-white text-neutral-950 hover:text-blue-500"
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
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

  protected isSubmitting = signal(false);
  protected form = this._fb.group({
    email: this._fb.nonNullable.control('', [Validators.email, Validators.required]),
    password: this._fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  protected signUp() {
    const { email, password } = this.form.getRawValue();
    this.isSubmitting.set(true);
    this._authService
      .signUp({ email, password })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._router.navigate(['/']))
      .add(() => this.isSubmitting.set(false));
  }
}
