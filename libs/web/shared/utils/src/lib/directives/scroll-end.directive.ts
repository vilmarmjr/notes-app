import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, fromEvent } from 'rxjs';

@Directive({
  selector: '[ntScrollEnd]',
})
export class ScrollEndDirective implements AfterViewInit {
  public scrollEnd = output<void>({ alias: 'ntScrollEnd' });
  private _element = inject(ElementRef);
  private _destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    const element = this._element.nativeElement;
    fromEvent(element, 'scroll')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        debounceTime(500),
        filter(() => this._isEnoughScrolled(element)),
      )
      .subscribe(() => this.scrollEnd.emit());
  }

  private _isEnoughScrolled(element: HTMLElement) {
    return (
      Math.ceil(element.scrollTop + element.offsetHeight) >= element.scrollHeight * 0.9
    );
  }
}
