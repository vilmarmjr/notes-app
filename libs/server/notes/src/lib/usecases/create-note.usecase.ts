import { CreateNoteRequestDto, CreateNoteResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class CreateNoteUseCase {
  constructor(@InjectRepository(Note) private _notesRepository: Repository<Note>) {}

  async execute(
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
}
