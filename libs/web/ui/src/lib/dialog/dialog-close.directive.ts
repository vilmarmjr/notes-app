import { Directive, inject } from '@angular/core';
import { DialogRef } from './dialog-ref';

@Directive({
  selector: '[ntDialogClose]',
  host: {
    '(click)': 'onClick()',
  },
})
export class DialogCloseDirective {
  private dialogRef = inject(DialogRef);

  protected onClick() {
    this.dialogRef.close();
  }
}
