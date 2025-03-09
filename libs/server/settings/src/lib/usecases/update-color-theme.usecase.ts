import { ColorTheme } from '@common/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';

@Injectable()
export class UpdateColorThemeUseCase {
  constructor(@InjectRepository(Settings) private _repository: Repository<Settings>) {}

  async execute(userId: string, colorTheme: ColorTheme) {
    const settings = await this._repository.findOne({ where: { user: { id: userId } } });
    this._repository.save({ ...settings, user: { id: userId }, colorTheme });
  }
}
