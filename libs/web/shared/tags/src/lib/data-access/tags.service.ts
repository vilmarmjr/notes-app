import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetTagsResponseDto } from '@common/models';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TagsService {
  private http = inject(HttpClient);

  getTags() {
    return this.http.get<GetTagsResponseDto>('tags').pipe(map(response => response.tags));
  }
}
