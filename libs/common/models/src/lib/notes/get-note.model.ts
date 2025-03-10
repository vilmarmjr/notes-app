import { z } from 'zod';

export const getNoteParamsSchema = z.object({
  id: z.string().uuid(),
});

export type GetNoteRequestParams = z.infer<typeof getNoteParamsSchema>;

export type GetNoteResponseDto = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};
