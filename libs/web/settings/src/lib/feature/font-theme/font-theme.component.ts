import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent, RadioModule } from '@web/shared/ui';
import { SettingsHeaderComponent } from '../../ui/settings-header/settings-header.component';
import { SettingsShellComponent } from '../settings-shell/settings-shell.component';

@Component({
  selector: 'nt-font-theme',
  imports: [
    CommonModule,
    SettingsShellComponent,
    SettingsHeaderComponent,
    RadioModule,
    IconComponent,
  ],
  template: `
    <nt-settings-shell>
      <nt-settings-header
        title="Font theme"
        description="Choose your font theme:"
        class="mb-6 block"
      />
      <nt-radio-group class="block max-w-[520px]">
        <nt-radio-button value="sansSerif" [checked]="true">
          <nt-icon ntRadioButtonIcon name="fontSansSerif" />
          <ng-container ntRadioButtonLabel>Sans-serif</ng-container>
          <ng-container ntRadioButtonDescription>
            Clean and modern, easy to read.
          </ng-container>
        </nt-radio-button>
        <nt-radio-button value="serif">
          <nt-icon ntRadioButtonIcon name="fontSerif" />
          <ng-container ntRadioButtonLabel>Serif</ng-container>
          <ng-container ntRadioButtonDescription>
            Classic and elegant for a timeless feel.
          </ng-container>
        </nt-radio-button>
        <nt-radio-button value="monospace">
          <nt-icon ntRadioButtonIcon name="fontMonospace" />
          <ng-container ntRadioButtonLabel>Monospace</ng-container>
          <ng-container ntRadioButtonDescription>
            Code-like, great for a technical vibe.
          </ng-container>
        </nt-radio-button>
      </nt-radio-group>
    </nt-settings-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontThemeComponent {}
