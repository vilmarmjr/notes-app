import { SettingsResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';

@Injectable()
export class GetSettingsUseCase {
  constructor(@InjectRepository(Settings) private repository: Repository<Settings>) {}

  async execute(userId: string): Promise<SettingsResponseDto> {
    const settings = await this.repository.findOne({ where: { user: { id: userId } } });
    return {
      colorTheme: settings?.colorTheme,
      fontTheme: settings?.fontTheme,
    };
  }
}
