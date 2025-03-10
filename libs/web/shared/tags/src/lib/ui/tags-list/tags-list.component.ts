import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, QueryParamsHandling } from '@angular/router';
import { DividerComponent, NavModule, SkeletonModule } from '@web/shared/ui';

@Component({
  selector: 'nt-tags-list',
  imports: [CommonModule, SkeletonModule, NavModule, DividerComponent],
  template: `
    @if (isLoading()) {
      <nt-skeleton class="flex flex-col gap-5 pt-2">
        <nt-skeleton-item class="h-4 w-1/2" />
        <nt-skeleton-item class="h-4 w-3/4" />
        <nt-skeleton-item class="h-4 w-full" />
        <nt-skeleton-item class="h-4 w-1/2" />
        <nt-skeleton-item class="h-4 w-5/6" />
        <nt-skeleton-item class="h-4 w-1/2" />
        <nt-skeleton-item class="h-4 w-4/6" />
      </nt-skeleton>
    } @else {
      <nt-nav>
        @for (tag of tags(); track tag; let last = $last) {
          <nt-nav-link
            icon="tag"
            [queryParams]="queryParams()"
            [queryParamsHandling]="queryParamsHandling()"
            [link]="'/notes/tags/' + tag"
            [label]="tag"
          />
          @if (withDivider() && !last) {
            <nt-divider />
          }
        }
      </nt-nav>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsListComponent {
  public tags = input<string[]>([]);
  public isLoading = input(false);
  public withDivider = input(false);
  public queryParams = input<Params | null>(null);
  public queryParamsHandling = input<QueryParamsHandling>('replace');
}
