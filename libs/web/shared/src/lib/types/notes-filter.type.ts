import { notesFilters } from '../constants/notes-filters.constants';

export type NotesFilter = (typeof notesFilters)[number];
