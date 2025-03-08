import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsController } from './controllers/settings.controller';
import { Settings } from './entities/settings.entity';
import { GetSettingsUseCase } from './usecases/get-settings.usecase';
import { UpdateColorThemeUseCase } from './usecases/update-color-theme.usecase';
import { UpdateFontThemeUseCase } from './usecases/update-font-theme.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [GetSettingsUseCase, UpdateColorThemeUseCase, UpdateFontThemeUseCase],
})
export class SettingsModule {}
