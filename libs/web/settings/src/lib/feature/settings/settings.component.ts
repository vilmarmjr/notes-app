import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BreakpointService } from '@web/shared/ui';
import { SettingsStore } from '../../store/settings.store';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsNavComponent } from '../../ui/settings-nav/settings-nav.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-settings',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    SettingsNavComponent,
  ],
  template: `
    <nt-settings-shell [withNav]="false">
      @if (!lg()) {
        <nt-settings-header title="Settings" [showBackButton]="false" />
      }
      <nt-settings-nav
        class="mt-4 block lg:mt-0"
        [isLoggingOut]="store.isLoggingOut()"
        (logOut)="store.logOut()"
      />
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  protected store = inject(SettingsStore);
  protected lg = inject(BreakpointService).lg;
}
