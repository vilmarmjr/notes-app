import { z } from 'zod';

export const updateNoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255).nonempty(),
  tags: z.array(z.string().max(255)),
  content: z.string(),
});

export type UpdateNoteRequestDto = z.infer<typeof updateNoteSchema>;

export type UpdateNoteResponseDto = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};
