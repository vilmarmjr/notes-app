import { ArchiveNoteRequestParams, NotesErrors } from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException } from '@server/shared/http';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class DeleteNoteUseCase {
  constructor(@InjectRepository(Note) private _notesRepository: Repository<Note>) {}

  async execute(userId: string, params: ArchiveNoteRequestParams) {
    const note = await this._notesRepository.findOneBy({
      user: { id: userId },
      id: params.id,
    });

    if (!note) {
      throw new ApplicationException(NotesErrors.NOTE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    this._notesRepository.delete(note.id);
  }
}
