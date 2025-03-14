import { notesFilters } from '../constants/notes-filters.constant';

export type NotesFilter = (typeof notesFilters)[number];
