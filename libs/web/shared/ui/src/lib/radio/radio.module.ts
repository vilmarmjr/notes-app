import { NgModule } from '@angular/core';
import { RadioButtonDescriptionDirective } from './radio-button-description.directive';
import { RadioButtonIconDirective } from './radio-button-icon.directive';
import { RadioButtonLabelDirective } from './radio-button-label.directive';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupComponent } from './radio-group.component';

@NgModule({
  imports: [
    RadioButtonComponent,
    RadioGroupComponent,
    RadioButtonIconDirective,
    RadioButtonLabelDirective,
    RadioButtonDescriptionDirective,
  ],
  exports: [
    RadioButtonComponent,
    RadioGroupComponent,
    RadioButtonIconDirective,
    RadioButtonLabelDirective,
    RadioButtonDescriptionDirective,
  ],
})
export class RadioModule {}
