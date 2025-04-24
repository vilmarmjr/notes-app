import { PaginateNotesRequestParams, PaginateNotesResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginateResponse } from '@server/shared';
import { Brackets, Repository } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class PaginateNotesUseCase {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

  async execute(
    userId: string,
    params: PaginateNotesRequestParams,
  ): Promise<PaginateNotesResponseDto> {
    const take = params.take || 10;
    const page = params.page || 1;
    const skip = (page - 1) * take;
    const query = params.query ? `%${params.query || ''}%` : '';
    const queryBuilder = this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.tags', 'tag')
      .where('note.user_id = :userId', { userId });

    if (query) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where('note.title ILIKE :query', { query })
            .orWhere('note.content ILIKE :query', { query })
            .orWhere('tag.name ILIKE :query', { query });
        }),
      );
    }

    if (params.status === 'archived') {
      queryBuilder.andWhere('note.archived = true');
    }

    if (params.status === 'active') {
      queryBuilder.andWhere('note.archived = false');
    }

    if (params.tag) {
      queryBuilder.andWhere('tag.name = :tag', { tag: params.tag });
    }

    const [content, count] = await queryBuilder
      .orderBy('note.createdAt', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();
    const notes = content.map(note => ({
      id: note.id,
      createdAt: note.createdAt.toISOString(),
      title: note.title,
      tags: note.tags.map(tag => tag.name),
      archived: note.archived,
    }));
    return paginateResponse(notes, count, page, take);
  }
}
