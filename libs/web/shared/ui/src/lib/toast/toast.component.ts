import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Type,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, merge, switchMap, takeUntil, timer } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { ToastRef } from './toast-ref';
import { TOAST_CONFIG } from './toast.service';

@Component({
  selector: 'nt-toast',
  imports: [CommonModule, IconComponent],
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
      } @else {
        <ng-container *ngComponentOutlet="content" />
      }
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
  protected content = this.config.content as Type<unknown>;
  private _elementRef = inject(ElementRef);

  constructor() {
    const mouseEnter$ = fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(
      takeUntilDestroyed(),
    );
    const mouseLeave$ = fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(
      takeUntilDestroyed(),
    );
    const extendedTimeout$ = timer(this.config.extendedTimeout).pipe(
      takeUntilDestroyed(),
      takeUntil(mouseEnter$),
    );
    const timeout$ = merge(
      mouseEnter$.pipe(
        switchMap(() => mouseLeave$.pipe(switchMap(() => extendedTimeout$))),
      ),
      timer(this.config.timeout).pipe(takeUntilDestroyed(), takeUntil(mouseEnter$)),
    );
    timeout$.subscribe(() => this.toastRef.close());
  }
}
