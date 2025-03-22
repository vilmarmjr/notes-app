import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
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
    <aside class="scrollable flex h-full w-64 flex-col overflow-y-auto px-4 py-5">
      <nt-logo class="mb-5" />
      <nt-nav class="mb-2">
        <nt-nav-link
          link="/notes"
          icon="home"
          label="All notes"
          [queryParams]="allNotesQueryParams()"
        />
        <nt-nav-link
          link="/notes"
          icon="archive"
          label="Archived notes"
          [queryParams]="archivedNotesQueryParams()"
        />
      </nt-nav>
      <nt-divider />
      <h3 class="text-preset-4 mb-2 mt-3 px-2 text-neutral-500">Tags</h3>
      <nt-tags-list
        [tags]="tagsStore.tags()"
        [isLoading]="tagsStore.isLoadingTags()"
        [queryParams]="tagsQueryParams()"
      />
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private activatedRoute = inject(ActivatedRoute);
  private queryParams = toSignal(
    this.activatedRoute.queryParams.pipe(map(params => ({ note: params['note'] }))),
    { requireSync: true },
  );
  protected allNotesQueryParams = computed(() => ({
    filter: 'all',
    ...this.queryParams(),
  }));
  protected archivedNotesQueryParams = computed(() => ({
    filter: 'archived',
    ...this.queryParams(),
  }));
  protected tagsQueryParams = computed(() => ({
    filter: 'tag',
    ...this.queryParams(),
  }));
  protected tagsStore = inject(TagsStore);
}
