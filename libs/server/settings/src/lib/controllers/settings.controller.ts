import {
  SaveColorThemeRequestDto,
  saveColorThemeSchema,
  SaveFontThemeRequestDto,
  saveFontThemeSchema,
} from '@common/models';
import { Body, Controller, Get, HttpCode, HttpStatus, Put, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { GetSettingsUseCase } from '../usecases/get-settings.usecase';
import { UpdateColorThemeUseCase } from '../usecases/update-color-theme.usecase';
import { UpdateFontThemeUseCase } from '../usecases/update-font-theme.usecase';

@Controller('settings')
export class SettingsController {
  constructor(
    private _getSettingsUseCase: GetSettingsUseCase,
    private _updateColorThemeUseCase: UpdateColorThemeUseCase,
    private _updateFontThemeUseCase: UpdateFontThemeUseCase,
  ) {}

  @Get()
  getSettings(@Req() req: ApplicationRequest) {
    return this._getSettingsUseCase.execute(req.user.id);
  }

  @Put('color')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateColorTheme(
    @Body(validateSchema(saveColorThemeSchema)) dto: SaveColorThemeRequestDto,
    @Req() req: ApplicationRequest,
  ) {
    return this._updateColorThemeUseCase.execute(req.user.id, dto.colorTheme);
  }

  @Put('font')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateFontTheme(
    @Body(validateSchema(saveFontThemeSchema)) dto: SaveFontThemeRequestDto,
    @Req() req: ApplicationRequest,
  ) {
    return this._updateFontThemeUseCase.execute(req.user.id, dto.fontTheme);
  }
}
