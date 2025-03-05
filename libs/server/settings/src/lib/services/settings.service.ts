import { ColorTheme, FontTheme, SettingsResponseDto } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(@InjectRepository(Settings) private _repository: Repository<Settings>) {}

  async getSettings(userId: string): Promise<SettingsResponseDto> {
    const settings = await this._repository.findOne({ where: { user: { id: userId } } });
    return {
      colorTheme: settings?.colorTheme,
      fontTheme: settings?.fontTheme,
    };
  }

  async updateColorTheme(userId: string, colorTheme: ColorTheme) {
    const settings = await this._repository.findOne({ where: { user: { id: userId } } });
    return this._repository.save({ ...settings, user: { id: userId }, colorTheme });
  }

  async updateFontTheme(userId: string, fontTheme: FontTheme) {
    const settings = await this._repository.findOne({ where: { user: { id: userId } } });
    return this._repository.save({ ...settings, user: { id: userId }, fontTheme });
  }
}
