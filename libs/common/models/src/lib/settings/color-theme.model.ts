import { z } from 'zod';

export const ColorThemes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SYSTEM: 'SYSTEM',
} as const;

export type ColorTheme = (typeof ColorThemes)[keyof typeof ColorThemes];

export const saveColorThemeSchema = z.object({
  colorTheme: z.enum([ColorThemes.LIGHT, ColorThemes.DARK, ColorThemes.SYSTEM]),
});

export type SaveColorThemeRequestDto = z.infer<typeof saveColorThemeSchema>;
