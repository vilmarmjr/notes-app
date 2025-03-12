import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PASSWORD_MIN_LENGTH } from '@common/models';
import { matchOtherValidator, PasswordFieldComponent } from '@web/shared/form';
import { ButtonDirective } from '@web/shared/ui';
import { SettingsStore } from '../../store/settings.store';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsContainerComponent } from '../settings-container/settings-container.component';

@Component({
  selector: 'nt-change-password',
  imports: [
    CommonModule,
    SettingsContainerComponent,
    SettingsHeaderComponent,
    PasswordFieldComponent,
    ButtonDirective,
    ReactiveFormsModule,
  ],
  template: `
    <nt-settings-container>
      <nt-settings-header title="Change password" />
      <form
        class="flex max-w-[520px] flex-col gap-6"
        [formGroup]="form"
        (ngSubmit)="submit()"
      >
        <nt-password-field label="Old password" formControlName="oldPassword" />
        <nt-password-field
          label="New password"
          formControlName="newPassword"
          [hint]="passwordHint"
        />
        <nt-password-field
          label="Confirm new password"
          formControlName="newPasswordConfirm"
          matchOtherError="New password and confirm password must match"
        />
        <div class="flex justify-end">
          <button ntButton [disabled]="!form.valid || store.isChangingPassword()">
            Save password
          </button>
        </div>
      </form>
    </nt-settings-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  private _fb = inject(FormBuilder);
  protected form = this._fb.group({
    oldPassword: this._fb.nonNullable.control('', [Validators.required]),
    newPassword: this._fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
    ]),
    newPasswordConfirm: this._fb.nonNullable.control('', [
      Validators.required,
      matchOtherValidator('newPassword'),
    ]),
  });
  protected store = inject(SettingsStore);
  protected readonly passwordHint = `At least ${PASSWORD_MIN_LENGTH} characters`;

  protected submit() {
    const { oldPassword, newPassword } = this.form.getRawValue();
    this.store.changePassword({
      dto: { oldPassword, newPassword },
      onSuccess: () => this.form.reset(),
    });
  }
}
