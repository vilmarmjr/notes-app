import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@web/ui';

@Component({
  selector: 'nt-info-error',
  imports: [CommonModule, IconComponent],
  template: `
    <div class="flex items-center gap-2">
      <nt-icon name="info" size="16" />
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoErrorComponent {}
