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
  private element = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    const element = this.element.nativeElement;
    fromEvent(element, 'scroll')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(500),
        filter(() => this.isEnoughScrolled(element)),
      )
      .subscribe(() => this.scrollEnd.emit());
  }

  private isEnoughScrolled(element: HTMLElement) {
    return (
      Math.ceil(element.scrollTop + element.offsetHeight) >= element.scrollHeight * 0.9
    );
  }
}
