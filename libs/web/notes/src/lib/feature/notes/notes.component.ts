import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonDirective,
  ErrorDirective,
  FormFieldComponent,
  HintDirective,
  IconComponent,
  InputDirective,
  LabelDirective,
} from '@web/shared/ui';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'n-notes',
  imports: [
    CommonModule,
    ButtonDirective,
    FormFieldComponent,
    IconComponent,
    InputDirective,
    LabelDirective,
    HintDirective,
    ErrorDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex w-[200px] flex-col gap-3 p-3">
      <button nButton variant="primary">
        <n-icon name="hidePassword" />
        Primary button
      </button>
      <button nButton variant="primary" [disabled]="true">Primary button</button>
      <button nButton variant="secondary">Secondary button</button>
      <button nButton variant="secondary" [disabled]="true">Secondary button</button>
      <button nButton variant="border">Border button</button>
      <button nButton variant="border" [disabled]="true">Border button</button>
    </div>
    <div class="flex w-[300px] flex-col gap-3 p-3">
      <n-form-field>
        <span nLabel>Number field</span>
        <input nInput type="number" />
      </n-form-field>
      <n-form-field>
        <span nLabel>Text field</span>
        <input nInput placeholder="My text" [formControl]="textControl" />
        <div nHint class="flex items-center gap-2">
          <n-icon name="info" size="16" />
          <span>This is a hint text to help user.</span>
        </div>
        <span nError>The field is required</span>
      </n-form-field>
      <n-form-field>
        <span nLabel>Text field</span>
        <input nInput placeholder="My text" [disabled]="true" />
        <span nHint>This is a hint text to help user.</span>
      </n-form-field>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  textControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
