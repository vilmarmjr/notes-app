import { CreateNoteRequestDto, CreateNoteResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class CreateNoteUseCase {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

  async execute(
    userId: string,
    dto: CreateNoteRequestDto,
  ): Promise<CreateNoteResponseDto> {
    const tags = Array.from(new Set(dto.tags));
    const note = await this.notesRepository.save({
      title: dto.title,
      content: dto.content,
      tags: tags.filter(Boolean).map(tag => ({ name: tag })),
      user: { id: userId },
    });
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      archived: note.archived,
      tags: note.tags.map(tag => tag.name),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }
}
