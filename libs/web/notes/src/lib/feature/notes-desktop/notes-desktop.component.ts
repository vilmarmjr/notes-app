import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '@web/core/layout';

@Component({
  selector: 'nt-notes-desktop',
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="flex h-full w-full">
      <nt-sidebar />
      <div class="flex-1">Content</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDesktopComponent {}
