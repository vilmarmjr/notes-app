import { z } from 'zod';

export const getNoteParamsSchema = z.object({
  id: z.string(),
});

export type GetNoteRequestParams = z.infer<typeof getNoteParamsSchema>;

export type GetNoteResponseDto = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};
