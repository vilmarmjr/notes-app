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
import { combineLatest, filter, map, startWith, tap } from 'rxjs';
import { ntMerge } from '../core/merge';
import { generateInputId } from './generate-input-id';

const inputVariants = cva('w-full bg-transparent text-preset-5 outline-none', {
  variants: {
    disabled: {
      false:
        'text-neutral-950 placeholder-neutral-500 dark:text-base-white dark:placeholder-neutral-300',
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
  protected computedClass = computed(() =>
    ntMerge(inputVariants({ disabled: this.disabled() }), this.userClass()),
  );

  private _hasError = signal(false);
  private ngControl = inject(NgControl, { optional: true, self: true });
  private destroyRef = inject(DestroyRef);
  private formControlDisabled = signal(false);

  public userDisabled = input(false, { alias: 'disabled' });
  public userClass = input<string>('', { alias: 'class' });
  public id = generateInputId();
  public hasError = this._hasError.asReadonly();
  public disabled = computed(() => this.userDisabled() || this.formControlDisabled());

  ngOnInit(): void {
    const control = this.ngControl?.control;

    if (control) {
      const status$ = control.statusChanges.pipe(
        startWith(control.status),
        tap(status => this.formControlDisabled.set(status === 'DISABLED')),
      );
      const touched$ = control.events.pipe(
        filter(
          (event): event is TouchedChangeEvent => event instanceof TouchedChangeEvent,
        ),
        map(event => event.touched),
        startWith(false),
      );
      combineLatest([status$, touched$])
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(([status, touched]) => {
          this._hasError.set(status === 'INVALID' && touched);
        });
    }
  }
}
