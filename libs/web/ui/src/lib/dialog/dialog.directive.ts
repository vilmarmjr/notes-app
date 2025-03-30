import {
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  model,
  TemplateRef,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogRef } from './dialog-ref';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[ntShowDialog]',
})
export class DialogDirective {
  public isOpen = model.required<boolean>({ alias: 'ntShowDialog' });
  public width = input<string | number>();
  public height = input<string | number>();
  public minWidth = input<string | number>();
  public minHeight = input<string | number>();
  public maxWidth = input<string | number>();
  public maxHeight = input<string | number>();

  private dialogService = inject(DialogService);
  private templateRef = inject(TemplateRef);
  private vcRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);
  private dialogRef: DialogRef | null = null;

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();

      untracked(() => {
        if (isOpen) {
          this.dialogRef = this.dialogService.open(this.templateRef, this.vcRef, {
            width: this.width(),
            height: this.height(),
            minWidth: this.minWidth(),
            minHeight: this.minHeight(),
            maxWidth: this.maxWidth(),
            maxHeight: this.maxHeight(),
          });
          this.dialogRef
            .afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.isOpen.set(false));
        } else {
          this.dialogRef?.close();
          this.dialogRef = null;
        }
      });
    });
  }
}
