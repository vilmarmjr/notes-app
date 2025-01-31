import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@web/shared/ui';

@Component({
  selector: 'n-login',
  imports: [CommonModule, ButtonComponent],
  template: `
    <p class="text-neutral-600">login works!</p>
    <n-button>Login</n-button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
