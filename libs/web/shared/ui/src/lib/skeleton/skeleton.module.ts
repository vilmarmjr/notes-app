import { NgModule } from '@angular/core';
import { SkeletonItemComponent } from './skeleton-item.component';
import { SkeletonComponent } from './skeleton.component';

@NgModule({
  imports: [SkeletonComponent, SkeletonItemComponent],
  exports: [SkeletonComponent, SkeletonItemComponent],
})
export class SkeletonModule {}
