import { FontTheme } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';

@Injectable()
export class UpdateFontThemeUseCase {
  constructor(@InjectRepository(Settings) private repository: Repository<Settings>) {}

  async execute(userId: string, fontTheme: FontTheme) {
    const settings = await this.repository.findOne({ where: { user: { id: userId } } });
    this.repository.save({ ...settings, user: { id: userId }, fontTheme });
  }
}
