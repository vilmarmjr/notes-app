import { GetTagsResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class GetTagsUseCase {
  constructor(@InjectRepository(Tag) private _tagsRepository: Repository<Tag>) {}

  async execute(userId: string): Promise<GetTagsResponseDto> {
    const tags = await this._tagsRepository
      .createQueryBuilder('tag')
      .innerJoin('tag.note', 'note')
      .innerJoin('note.user', 'user')
      .where('user.id = :userId', { userId })
      .distinctOn(['tag.name'])
      .getMany();
    return {
      tags: tags.map(tag => tag.name),
    };
  }
}
