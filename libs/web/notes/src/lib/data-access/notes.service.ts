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

@Injectable({ providedIn: 'root' })
export class NotesService {
  private _http = inject(HttpClient);

  createNote(dto: CreateNoteRequestDto) {
    return this._http.post<CreateNoteResponseDto>('notes', dto);
  }

  updateNote(dto: UpdateNoteRequestDto) {
    return this._http.put<UpdateNoteResponseDto>('notes', dto);
  }

  paginateNotes(params: PaginateNotesRequestParams = {}) {
    return this._http.get<PaginateNotesResponseDto>('notes', { params });
  }

  getNoteById(id: string) {
    return this._http.get<GetNoteResponseDto>(`notes/${id}`);
  }

  deleteNote(id: string) {
    return this._http.delete<void>(`notes/${id}`);
  }

  archiveNote(id: string) {
    return this._http.put(`notes/${id}/archive`, null);
  }

  restoreNote(id: string) {
    return this._http.put(`notes/${id}/restore`, null);
  }
}
