import { z } from 'zod';

export const deleteNoteParamsSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteNoteRequestParams = z.infer<typeof deleteNoteParamsSchema>;
