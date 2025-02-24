import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PASSWORD_MIN_LENGTH } from '@common/constants';
import { PasswordFieldComponent } from '@web/shared/form';
import { ButtonDirective } from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-change-password',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    PasswordFieldComponent,
    ButtonDirective,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header title="Change password" />
      <form class="flex max-w-[520px] flex-col gap-6">
        <nt-password-field label="Old password" />
        <nt-password-field label="New password" [hint]="passwordHint" />
        <nt-password-field label="Confirm new password" />
        <div class="flex justify-end">
          <button ntButton>Save password</button>
        </div>
      </form>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  protected readonly passwordHint = `At least ${PASSWORD_MIN_LENGTH} characters`;
}
