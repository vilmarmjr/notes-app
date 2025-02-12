import {
  computed,
  DestroyRef,
  Directive,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, TouchedChangeEvent } from '@angular/forms';
import { cva } from 'class-variance-authority';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { generateInputId } from './generate-input-id';

const inputVariants = cva('text-preset-5 w-full bg-transparent outline-none', {
  variants: {
    disabled: {
      false:
        'dark:text-base-white text-neutral-950 placeholder-neutral-500 dark:placeholder-neutral-300',
      true: 'text-neutral-300 placeholder-neutral-300 dark:text-neutral-500',
    },
  },
});

@Directive({
  selector: 'input[ntInput]',
  host: {
    '[attr.id]': 'id',
    '[attr.disabled]': 'disabledAttr()',
    '[attr.class]': 'computedClass()',
  },
})
export class InputDirective implements OnInit {
  protected disabledAttr = computed(() => this.disabled() || null);
  protected computedClass = computed(() => inputVariants({ disabled: this.disabled() }));

  private _hasError = signal(false);
  private _ngControl = inject(NgControl, { optional: true, self: true });
  private _destroyRef = inject(DestroyRef);

  public readonly disabled = input(false);
  public readonly id = generateInputId();
  public readonly hasError = this._hasError.asReadonly();

  ngOnInit(): void {
    const control = this._ngControl?.control;

    if (control) {
      const status$ = control.statusChanges.pipe(startWith(control.status));
      const touched$ = control.events.pipe(
        filter(
          (event): event is TouchedChangeEvent => event instanceof TouchedChangeEvent,
        ),
        map(event => event.touched),
        startWith(false),
      );
      combineLatest([status$, touched$])
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(([status, touched]) => {
          this._hasError.set(status === 'INVALID' && touched);
        });
    }
  }
}
