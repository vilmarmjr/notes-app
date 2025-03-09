import { z } from 'zod';

export const restoreNoteParamsSchema = z.object({
  id: z.string().uuid(),
});

export type RestoreNoteRequestParams = z.infer<typeof restoreNoteParamsSchema>;
