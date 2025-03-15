import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().max(255).nonempty(),
  tags: z.array(z.string().max(255)),
  content: z.string(),
});

export type CreateNoteRequestDto = z.infer<typeof createNoteSchema>;

export type CreateNoteResponseDto = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
};
