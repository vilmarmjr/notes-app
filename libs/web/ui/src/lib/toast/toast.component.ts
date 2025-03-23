import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, switchMap, takeUntil, timer } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { ToastRef } from './toast-ref';
import { TOAST_CONFIG } from './toast.service';

@Component({
  selector: 'nt-toast',
  imports: [CommonModule, IconComponent, CdkPortalOutlet],
  host: {
    class:
      'bg-base-white flex items-center gap-2 rounded-lg border border-neutral-200 p-2 w-full dark:border-neutral-700 dark:bg-neutral-800',
    '[@slideInOut]': 'true',
  },
  animations: [
    trigger('slideInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [animate('400ms ease-in')]),
    ]),
  ],
  template: `
    <nt-icon
      class="flex-shrink-0"
      [class]="config.type === 'error' ? 'text-red-500' : 'text-green-500'"
      [name]="config.type === 'error' ? 'crossmark' : 'checkmark'"
    />
    <span class="text-preset-6 dark:text-base-white w-full text-neutral-950">
      @if (isText) {
        {{ config.content }}
      }
      <ng-container cdkPortalOutlet />
    </span>
    <button
      class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
      (click)="toastRef.close()"
    >
      <nt-icon name="cross" class="text-neutral-400" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected config = inject(TOAST_CONFIG);
  protected toastRef = inject(ToastRef);
  protected isText = typeof this.config.content === 'string';
  private elementRef = inject(ElementRef);
  private portalOutlet = viewChild.required(CdkPortalOutlet);

  constructor() {
    const mouseEnter$ = fromEvent(this.elementRef.nativeElement, 'mouseenter');
    const mouseLeave$ = fromEvent(this.elementRef.nativeElement, 'mouseleave');
    const extendedTimeout$ = timer(this.config.extendedTimeout).pipe(
      takeUntil(mouseEnter$),
    );
    const timeout$ = merge(
      mouseEnter$.pipe(
        switchMap(() => mouseLeave$.pipe(switchMap(() => extendedTimeout$))),
      ),
      timer(this.config.timeout).pipe(takeUntil(mouseEnter$)),
    );
    timeout$.pipe(takeUntilDestroyed()).subscribe(() => this.toastRef.close());
  }

  public attachComponentPortal<T>(componentPortal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalOutlet().attachComponentPortal(componentPortal);
  }
}
