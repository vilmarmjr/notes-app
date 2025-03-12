import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ntMerge } from '@web/shared/utils';
import { icons } from './icons';

type IconSizeOption = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56;

export type IconSize = IconSizeOption | `${IconSizeOption}`;
export type IconName = keyof typeof icons;

const ONE_REM_IN_PIXELS = 16;

@Component({
  selector: 'nt-icon',
  template: '',
  host: {
    '[innerHTML]': 'icon()',
    '[style.width]': 'sizeInRem()',
    '[style.height]': 'sizeInRem()',
    '[class]': 'computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private domSanitizer = inject(DomSanitizer);

  public name = input.required<IconName>();
  public size = input<IconSize>(20);
  public userClass = input<string>('', { alias: 'class' });

  protected sizeInRem = computed(() => `${Number(this.size()) / ONE_REM_IN_PIXELS}rem`);
  protected icon = computed(() =>
    this.domSanitizer.bypassSecurityTrustHtml(icons[this.name()]),
  );
  protected computedClass = computed(() => ntMerge('inline-block', this.userClass()));
}
