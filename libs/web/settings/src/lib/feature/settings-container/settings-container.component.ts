import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DesktopHeaderComponent } from '@web/core';
import { BreakpointService, DividerComponent } from '@web/ui';
import { SettingsStore } from '../../store/settings.store';
import { SettingsNavComponent } from '../../ui/settings-nav/settings-nav.component';

@Component({
  selector: 'nt-settings-container',
  imports: [CommonModule, DesktopHeaderComponent, DividerComponent, SettingsNavComponent],
  template: `
    @if (lg()) {
      <div class="flex h-full flex-col">
        <nt-desktop-header title="Settings" />
        <nt-divider />
        <div class="flex min-h-0 flex-1">
          @if (withNav()) {
            <div class="flex w-72 flex-col overflow-y-auto px-4 py-5">
              <nt-settings-nav
                class="mb-2"
                [isLoggingOut]="store.isLoggingOut()"
                (logOut)="store.logOut()"
              />
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
export class SettingsContainerComponent {
  public withNav = input(true);
  protected store = inject(SettingsStore);
  protected lg = inject(BreakpointService).lg;
}
