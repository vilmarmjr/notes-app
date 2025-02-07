import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { icons } from './icons';

type IconSizeOption = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56;

export type IconSize = IconSizeOption | `${IconSizeOption}`;
export type IconName = keyof typeof icons;

const ONE_REM_IN_PIXELS = 16;

@Component({
  selector: 'n-icon',
  template: '',
  host: {
    '[innerHTML]': 'icon()',
    '[style.width]': 'sizeInRem()',
    '[style.height]': 'sizeInRem()',
    class: 'inline-block',
  },
})
export class IconComponent {
  private _domSanitizer = inject(DomSanitizer);

  public name = input.required<IconName>();
  public size = input<IconSize>(20);

  protected sizeInRem = computed(() => `${Number(this.size()) / ONE_REM_IN_PIXELS}rem`);
  protected icon = computed(() =>
    this._domSanitizer.bypassSecurityTrustHtml(icons[this.name()]),
  );
}
