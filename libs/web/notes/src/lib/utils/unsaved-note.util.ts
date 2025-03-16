import { PaginateNotesResponseItemDto } from '@common/models';

export function createUnsavedNote(
  note?: Partial<Omit<PaginateNotesResponseItemDto, 'id' | 'createdAt' | 'archived'>>,
): PaginateNotesResponseItemDto {
  return {
    id: 'new',
    title: note?.title || 'Untitled Note',
    archived: false,
    createdAt: '',
    tags: note?.tags || [],
  };
}
