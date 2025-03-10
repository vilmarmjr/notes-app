import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TagsListComponent, TagsStore } from '@web/shared/tags';
import { DividerComponent, NavModule } from '@web/shared/ui';
import { map } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'nt-sidebar',
  imports: [CommonModule, LogoComponent, DividerComponent, NavModule, TagsListComponent],
  template: `
    <aside class="flex h-full w-64 flex-col overflow-y-auto px-4 py-5">
      <nt-logo class="mb-5" />
      <nt-nav class="mb-2">
        <nt-nav-link
          link="/notes/all"
          icon="home"
          label="All notes"
          [queryParams]="queryParams()"
        />
        <nt-nav-link
          link="/notes/archived"
          icon="archive"
          label="Archived notes"
          [queryParams]="queryParams()"
        />
      </nt-nav>
      <nt-divider />
      <h3 class="text-preset-4 mb-2 mt-3 px-2 text-neutral-500">Tags</h3>
      <nt-tags-list
        [tags]="tagsStore.tags()"
        [isLoading]="tagsStore.isLoadingTags()"
        [queryParams]="queryParams()"
      />
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private _activatedRoute = inject(ActivatedRoute);
  protected tagsStore = inject(TagsStore);
  protected queryParams = toSignal(
    this._activatedRoute.queryParams.pipe(map(params => ({ note: params['note'] }))),
    { requireSync: true },
  );
}
