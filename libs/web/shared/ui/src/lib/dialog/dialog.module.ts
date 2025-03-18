import { NgModule } from '@angular/core';
import { DialogCloseDirective } from './dialog-close.directive';
import { DialogFooterComponent } from './dialog-footer.component';
import { DialogIconComponent } from './dialog-icon.component';
import { DialogTextDirective } from './dialog-text.directive';
import { DialogTitleDirective } from './dialog-title.directive';

@NgModule({
  imports: [
    DialogCloseDirective,
    DialogTitleDirective,
    DialogTextDirective,
    DialogFooterComponent,
    DialogIconComponent,
  ],
  exports: [
    DialogCloseDirective,
    DialogTitleDirective,
    DialogTextDirective,
    DialogFooterComponent,
    DialogIconComponent,
  ],
})
export class DialogModule {}
