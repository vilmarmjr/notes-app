import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { NotesFilter } from '@web/shared';

const notesTitles: Record<NotesFilter, string> = {
  all: 'Notes - All notes',
  archived: 'Notes - Archived notes',
  search: 'Notes - Search notes',
  tag: 'Notes - Tagged notes',
};

const defaultTitle = 'Notes';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    if (snapshot.url.startsWith('/notes')) {
      return this.title.setTitle(this.getNotesRouteTitle(snapshot));
    }
    return this.title.setTitle(this.buildTitle(snapshot) || defaultTitle);
  }

  private getNotesRouteTitle(snapshot: RouterStateSnapshot): string {
    const filter = snapshot.root.queryParamMap.get('filter') as NotesFilter;
    const tag = snapshot.root.queryParamMap.get('tag');

    if (filter === 'tag' && tag) {
      return `Notes - ${tag}`;
    }

    return notesTitles[filter] || defaultTitle;
  }
}
