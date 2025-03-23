import { NotesErrors, UpdateNoteRequestDto, UpdateNoteResponseDto } from '@common/models';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationException } from '@server/shared';
import { In, Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class UpdateNoteUseCase {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
  ) {}

  async execute(
    userId: string,
    dto: UpdateNoteRequestDto,
  ): Promise<UpdateNoteResponseDto> {
    const note = await this.notesRepository.findOneBy({
      id: dto.id,
      user: { id: userId },
    });

    if (!note) {
      throw new ApplicationException(NotesErrors.NOTE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const tags = await this.getUpdatedTags(note.id, dto.tags);
    const result = await this.notesRepository.save({
      id: note.id,
      title: dto.title,
      content: dto.content,
      tags,
    });

    return {
      id: result.id,
      title: result.title,
      content: result.content,
      archived: result.archived,
      tags: result.tags.map(tag => tag.name),
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  private async getUpdatedTags(noteId: string, tags: string[]) {
    if (!tags.length) {
      return [];
    }

    const uniqueTags = Array.from(new Set(tags));
    const existingTags = await this.tagsRepository.find({
      where: { name: In(uniqueTags), note: { id: noteId } },
    });
    return uniqueTags.filter(Boolean).map(tag => ({
      id: existingTags.find(t => t.name === tag)?.id,
      name: tag,
    }));
  }
}
