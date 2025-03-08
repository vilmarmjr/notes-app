import {
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  GetNoteResponseDto,
  NotesErrors,
} from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException } from '@server/shared/http';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Tag } from '../entities/tag.entity';

export type GetNoteByIdFilters = {
  noteId: string;
  userId: string;
};

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private _notesRepository: Repository<Note>,
    @InjectRepository(Tag) private _tagsRepository: Repository<Tag>,
  ) {}

  async createNote(
    userId: string,
    dto: CreateNoteRequestDto,
  ): Promise<CreateNoteResponseDto> {
    const tags = Array.from(new Set(dto.tags));
    const note = await this._notesRepository.save({
      title: dto.title,
      content: dto.content,
      tags: tags.map(tag => ({ name: tag })),
      user: { id: userId },
    });
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags.map(tag => tag.name),
    };
  }

  async getNoteById({ noteId, userId }: GetNoteByIdFilters): Promise<GetNoteResponseDto> {
    const note = await this._notesRepository.findOneBy({
      id: noteId,
      user: { id: userId },
    });

    if (!note) {
      throw new ApplicationException(NotesErrors.NOTE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const tags = await this._tagsRepository.findBy({ note: { id: noteId } });

    return {
      id: note.id,
      title: note.title,
      content: note.content,
      tags: tags.map(tag => tag.name),
    };
  }
}
