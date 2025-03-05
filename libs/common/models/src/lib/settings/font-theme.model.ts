import { z } from 'zod';

export const FontThemes = {
  SANS_SERIF: 'SANS_SERIF',
  SERIF: 'SERIF',
  MONOSPACE: 'MONOSPACE',
} as const;

export type FontTheme = (typeof FontThemes)[keyof typeof FontThemes];

export const saveFontThemeSchema = z.object({
  fontTheme: z.enum([FontThemes.SANS_SERIF, FontThemes.SERIF, FontThemes.MONOSPACE]),
});

export type SaveFontThemeRequestDto = z.infer<typeof saveFontThemeSchema>;
