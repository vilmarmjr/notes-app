import {
  SaveColorThemeRequestDto,
  saveColorThemeSchema,
  SaveFontThemeRequestDto,
  saveFontThemeSchema,
} from '@common/models';
import { Body, Controller, Get, HttpCode, HttpStatus, Put, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { SettingsService } from '../services/settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private _settingsService: SettingsService) {}

  @Get()
  getSettings(@Req() req: ApplicationRequest) {
    return this._settingsService.getSettings(req.user.id);
  }

  @Put('color')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateColorTheme(
    @Body(validateSchema(saveColorThemeSchema)) dto: SaveColorThemeRequestDto,
    @Req() req: ApplicationRequest,
  ) {
    this._settingsService.updateColorTheme(req.user.id, dto.colorTheme);
  }

  @Put('font')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateFontTheme(
    @Body(validateSchema(saveFontThemeSchema)) dto: SaveFontThemeRequestDto,
    @Req() req: ApplicationRequest,
  ) {
    this._settingsService.updateFontTheme(req.user.id, dto.fontTheme);
  }
}
