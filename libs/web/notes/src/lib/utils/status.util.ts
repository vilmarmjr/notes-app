import { PaginateNotesRequestParams } from '@common/models';
import { NotesFilter } from '@web/shared';

export function getStatus(filter: NotesFilter): PaginateNotesRequestParams['status'] {
  if (filter === 'archived') {
    return 'archived';
  }
  if (filter === 'search') {
    return 'all';
  }
  return 'active';
}
