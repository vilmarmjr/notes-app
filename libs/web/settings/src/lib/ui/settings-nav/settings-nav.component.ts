import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DividerComponent, IconName, NavModule } from '@web/shared/ui';
@Component({
  selector: 'nt-settings-nav',
  imports: [CommonModule, NavModule, DividerComponent],
  template: `
    <nt-nav class="mb-2 block">
      @for (item of linkItems; track item.link) {
        <nt-nav-link [link]="item.link" [icon]="item.icon" [label]="item.label" />
      }
    </nt-nav>
    <nt-divider class="mb-2 block" />
    <nt-nav>
      <nt-nav-button
        icon="logout"
        label="Logout"
        [disabled]="isLoggingOut()"
        (click)="logOut.emit()"
      />
    </nt-nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNavComponent {
  public logOut = output();
  public isLoggingOut = input(false);
  protected linkItems = [
    {
      link: '/settings/color-theme',
      icon: 'sun',
      label: 'Color theme',
    },
    {
      link: '/settings/font-theme',
      icon: 'font',
      label: 'Font theme',
    },
    {
      link: '/settings/change-password',
      icon: 'lock',
      label: 'Change password',
    },
  ] satisfies Array<{
    link: string;
    icon: IconName;
    label: string;
  }>;
}
