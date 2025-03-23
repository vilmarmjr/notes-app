import { NgModule } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { FormFieldComponent } from './form-field.component';
import { HintDirective } from './hint.directive';
import { LabelDirective } from './label.directive';
import { PrefixDirective } from './prefix.directive';
import { SuffixDirective } from './suffix.directive';

@NgModule({
  imports: [
    FormFieldComponent,
    ErrorDirective,
    HintDirective,
    LabelDirective,
    PrefixDirective,
    SuffixDirective,
  ],
  exports: [
    FormFieldComponent,
    ErrorDirective,
    HintDirective,
    LabelDirective,
    PrefixDirective,
    SuffixDirective,
  ],
})
export class FormFieldModule {}
