import { GetNoteResponseDto, NotesErrors } from '@common/models';
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
export class GetNoteByIdUseCase {
  constructor(
    @InjectRepository(Note) private _notesRepository: Repository<Note>,
    @InjectRepository(Tag) private _tagsRepository: Repository<Tag>,
  ) {}

  async execute({ noteId, userId }: GetNoteByIdFilters): Promise<GetNoteResponseDto> {
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
      archived: note.archived,
      tags: tags.map(tag => tag.name),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }
}
