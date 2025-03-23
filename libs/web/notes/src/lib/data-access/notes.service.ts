import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  GetNoteResponseDto,
  PaginateNotesRequestParams,
  PaginateNotesResponseDto,
  UpdateNoteRequestDto,
  UpdateNoteResponseDto,
} from '@common/models';
import { buildHttpParams } from '@web/shared';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);

  createNote(dto: CreateNoteRequestDto) {
    return this.http.post<CreateNoteResponseDto>('notes', dto);
  }

  updateNote(dto: UpdateNoteRequestDto) {
    return this.http.put<UpdateNoteResponseDto>('notes', dto);
  }

  paginateNotes(params: PaginateNotesRequestParams = {}) {
    return this.http.get<PaginateNotesResponseDto>('notes', {
      params: buildHttpParams(params),
    });
  }

  getNoteById(id: string) {
    return this.http.get<GetNoteResponseDto>(`notes/${id}`);
  }

  deleteNote(id: string) {
    return this.http.delete<void>(`notes/${id}`);
  }

  archiveNote(id: string) {
    return this.http.put(`notes/${id}/archive`, null);
  }

  restoreNote(id: string) {
    return this.http.put(`notes/${id}/restore`, null);
  }
}
