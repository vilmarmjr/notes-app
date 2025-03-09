import { z } from 'zod';

export const archiveNoteParamsSchema = z.object({
  id: z.string().uuid(),
});

export type ArchiveNoteRequestParams = z.infer<typeof archiveNoteParamsSchema>;
