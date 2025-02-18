import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormFieldModule, IconComponent, InputDirective } from '@web/shared/ui';

@Component({
  selector: 'nt-search-field',
  imports: [CommonModule, FormFieldModule, IconComponent, InputDirective],
  template: `
    <nt-form-field>
      <nt-icon ntPrefix name="search" />
      <input
        ntInput
        placeholder="Search by title, content, or tags..."
        [value]="query()"
      />
    </nt-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent {
  public query = input<string | null>(null);
}
