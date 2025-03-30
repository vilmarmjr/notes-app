import { AfterViewInit, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { IconComponent } from '../icon/icon.component';
import { InputDirective } from '../input/input.directive';
import { FormFieldComponent } from './form-field.component';
import { FormFieldModule } from './form-field.module';

@Component({
  imports: [FormFieldModule, InputDirective, IconComponent, ReactiveFormsModule],
  template: `
    <div class="flex max-w-64 flex-col gap-4">
      <nt-form-field>
        <span ntLabel>Password</span>
        <nt-icon ntPrefix name="showPassword" />
        <input #input ntInput placeholder="Enter a password" />
        <nt-icon ntSuffix name="showPassword" />
        <div ntHint class="flex items-center gap-2">
          <nt-icon name="info" size="16" />
          <span>This is a hint text to help user.</span>
        </div>
      </nt-form-field>
      <nt-form-field>
        <span ntLabel>Password</span>
        <nt-icon ntPrefix name="showPassword" />
        <input #input ntInput placeholder="Enter a password" [disabled]="true" />
        <nt-icon ntSuffix name="showPassword" />
        <div ntHint class="flex items-center gap-2">
          <nt-icon name="info" size="16" />
          <span>This is a hint text to help user.</span>
        </div>
      </nt-form-field>
      <nt-form-field>
        <span ntLabel>Password</span>
        <nt-icon ntPrefix name="showPassword" />
        <input #input ntInput placeholder="Enter a password" [formControl]="control" />
        <nt-icon ntSuffix name="showPassword" />
        <div ntError class="flex items-center gap-2">
          <nt-icon name="info" size="16" />
          <span>This is a hint text to help user.</span>
        </div>
      </nt-form-field>
    </div>
  `,
})
class DemoComponent implements AfterViewInit {
  protected control = new FormControl<string | null>(null, [Validators.required]);

  ngAfterViewInit(): void {
    this.control.markAsTouched();
  }
}

const meta: Meta<FormFieldComponent> = {
  component: DemoComponent,
  title: 'Form field',
};

export default meta;

type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {};
