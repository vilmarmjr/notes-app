import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  SaveColorThemeRequestDto,
  SaveFontThemeRequestDto,
  SettingsResponseDto,
} from '@common/models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private http = inject(HttpClient);

  getSettings() {
    return this.http.get<SettingsResponseDto>('settings');
  }

  saveColorTheme(dto: SaveColorThemeRequestDto) {
    return this.http.put<void>('settings/color', dto);
  }

  saveFontTheme(dto: SaveFontThemeRequestDto) {
    return this.http.put<void>('settings/font', dto);
  }
}
