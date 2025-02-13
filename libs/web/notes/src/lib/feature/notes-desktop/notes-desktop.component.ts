import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '@web/core/layout';
import { NotesHeaderComponent } from '../../ui/notes-header/notes-header.component';

@Component({
  selector: 'nt-notes-desktop',
  imports: [CommonModule, SidebarComponent, NotesHeaderComponent],
  template: `
    <div class="bg-base-white flex h-full w-full dark:bg-neutral-950">
      <nt-sidebar />
      <div class="flex flex-1 flex-col">
        <nt-notes-header />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDesktopComponent {}
