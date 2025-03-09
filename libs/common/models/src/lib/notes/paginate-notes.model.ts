import { z } from 'zod';
import { Paginated } from '../page/page.model';

export const paginateNotesParamsSchema = z.object({
  query: z.string().optional(),
  tag: z.string().optional(),
  take: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  archivedOnly: z
    .string()
    .refine(value => value === 'true' || value === 'false')
    .transform(value => value === 'true')
    .optional(),
});

export type PaginateNotesRequestDto = z.infer<typeof paginateNotesParamsSchema>;

export type PaginateNotesResponseItemDto = {
  id: string;
  title: string;
  tags: string[];
  createdAt: string;
};

export type PaginateNotesResponseDto = Paginated<PaginateNotesResponseItemDto>;
