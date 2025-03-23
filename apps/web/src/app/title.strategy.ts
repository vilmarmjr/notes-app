import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class NotesTitleStrategy extends TitleStrategy {
  private title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    if (snapshot.url.startsWith('/notes')) {
      return this.title.setTitle(this.getNotesRouteTitle(snapshot));
    }
    return this.title.setTitle(this.buildTitle(snapshot) || 'Notes');
  }

  private getNotesRouteTitle(snapshot: RouterStateSnapshot): string {
    const filter = snapshot.root.queryParamMap.get('filter');
    const tag = snapshot.root.queryParamMap.get('tag');

    if (filter === 'all') {
      return 'Notes - All notes';
    }

    if (filter === 'archived') {
      return 'Notes - Archived notes';
    }

    if (filter === 'tag' && tag) {
      return `Notes - ${tag}`;
    }

    if (filter === 'search') {
      return 'Notes - Search';
    }

    return 'Notes';
  }
}
