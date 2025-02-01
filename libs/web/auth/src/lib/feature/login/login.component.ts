import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '@web/shared/ui';

@Component({
  selector: 'n-login',
  imports: [CommonModule, ButtonDirective],
  template: `
    <p class="text-neutral-600">login works!</p>
    <button nButton>Login</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
