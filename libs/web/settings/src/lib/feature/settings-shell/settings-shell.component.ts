import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DesktopHeaderComponent } from '@web/core/layout';
import { BreakpointService, DividerComponent } from '@web/shared/ui';
import { SettingsNavComponent } from '../../ui/settings-nav/settings-nav.component';

@Component({
  selector: 'nt-settings-shell',
  imports: [CommonModule, DesktopHeaderComponent, DividerComponent, SettingsNavComponent],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col">
        <nt-desktop-header title="Settings"></nt-desktop-header>
        <nt-divider />
        <div class="flex min-h-0 flex-1">
          @if (withNav()) {
            <div class="flex w-72 flex-col overflow-y-auto px-4 py-5">
              <nt-settings-nav class="mb-2" />
            </div>
            <nt-divider direction="vertical" />
          }
          <div class="flex-1 p-5">
            <ng-container *ngTemplateOutlet="content" />
          </div>
        </div>
      </div>
    } @else {
      <ng-container *ngTemplateOutlet="content" />
    }
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsShellComponent {
  public withNav = input(true);
  protected lg = inject(BreakpointService).lg;
}
