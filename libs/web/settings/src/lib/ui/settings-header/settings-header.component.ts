import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@web/shared/ui';

@Component({
  selector: 'nt-settings-header',
  imports: [CommonModule, IconComponent, RouterLink],
  template: `
    <div class="flex flex-col gap-3 lg:gap-1">
      @if (showBackButton()) {
        <a
          class="text-preset-5 dark:text-base-white flex items-center gap-1 self-start text-neutral-600 lg:hidden"
          routerLink="/settings"
        >
          <nt-icon name="arrowLeft" />
          Settings
        </a>
      }
      <h1 class="text-preset-1 lg:text-preset-3 dark:text-base-white text-neutral-950">
        {{ title() }}
      </h1>
      @if (description(); as description) {
        <p class="text-preset-5 text-neutral-700 dark:text-neutral-300">
          {{ description }}
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsHeaderComponent {
  public title = input.required<string>();
  public description = input<string | null>(null);
  public showBackButton = input(true);
}
