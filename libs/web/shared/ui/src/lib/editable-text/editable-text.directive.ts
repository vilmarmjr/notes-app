import {
  computed,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ntMerge } from '@web/shared/utils';
import { cva } from 'class-variance-authority';

const editableTextVariants = cva('', {
  variants: {
    disabled: {
      true: '',
      false:
        '-m-1 rounded-md p-1 outline-none hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
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
  protected computedClass = computed(() =>
    ntMerge(editableTextVariants({ disabled: this.disabled() }), this.userClass()),
  );
  protected disabled = computed(() => this.formControlDisabled() || this.userDisabled());
  private placeholder = '';
  private elementRef = inject(ElementRef<HTMLElement>);
  private formControlDisabled = signal(false);
  private onChange: ChangeFn = () => {};
  private onTouched: TouchFn = () => {};

  ngOnInit() {
    this.placeholder = this.elementRef.nativeElement.textContent.trim() || '';
  }

  writeValue(value: string) {
    this.elementRef.nativeElement.textContent = value || this.placeholder;
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
    if (!this.element.textContent?.trim()) {
      this.element.textContent = this.placeholder;
    }
  }

  protected onFocus() {
    this.onTouched();
    if (this.element.textContent?.trim() === this.placeholder) {
      this.element.textContent = '';
    }
  }

  protected onInput() {
    this.onChange(this.element.textContent?.trim() || '');
  }

  private get element() {
    return this.elementRef.nativeElement;
  }
}
