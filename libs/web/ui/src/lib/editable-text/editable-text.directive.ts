import {
  computed,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva } from 'class-variance-authority';
import { ntMerge } from '../core/merge';

const editableTextVariants = cva('break-all', {
  variants: {
    disabled: {
      true: '',
      false:
        '-m-1 rounded-md p-1 outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
    },
    empty: {
      true: 'text-neutral-400',
      false: 'text-neutral-950 dark:text-base-white',
    },
  },
});

type ChangeFn = (value: string) => void;
type TouchFn = () => void;

@Directive({
  selector: '[ntEditableText]',
  host: {
    '[attr.contenteditable]': '!disabled()',
    '[class]': 'computedClass()',
    '(input)': 'onInput()',
    '(blur)': 'onBlur()',
    '(focus)': 'onFocus()',
    '(keydown)': 'onKeyDown($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditableTextDirective),
      multi: true,
    },
  ],
})
export class EditableTextDirective implements OnInit, ControlValueAccessor {
  public userDisabled = input(false, { alias: 'disabled' });
  public userClass = input<string>('', { alias: 'class' });
  public blurChange = output<string>();
  protected computedClass = computed(() =>
    ntMerge(
      editableTextVariants({ disabled: this.disabled(), empty: !this.value() }),
      this.userClass(),
    ),
  );
  protected disabled = computed(() => this.formControlDisabled() || this.userDisabled());
  private placeholder = '';
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private formControlDisabled = signal(false);
  private value = signal('');
  private onChange: ChangeFn = () => {};
  private onTouched: TouchFn = () => {};

  ngOnInit() {
    this.placeholder = this.element.textContent?.trim() || '';
  }

  writeValue(value: string) {
    this.value.set(value);
    this.element.textContent = value || this.placeholder;
  }

  registerOnChange(fn: ChangeFn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchFn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDisabled.set(isDisabled);
  }

  protected onBlur() {
    this.element.textContent = this.value() || this.placeholder;
    this.blurChange.emit(this.value());
  }

  protected onFocus() {
    this.onTouched();
    if (this.element.textContent?.trim() === this.placeholder) {
      this.element.textContent = '';
    }
  }

  protected onInput() {
    const value = this.element.textContent?.trim() || '';
    this.value.set(value);
    this.onChange(value);
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  private get element() {
    return this.elementRef.nativeElement;
  }
}
