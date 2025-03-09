import { z } from 'zod';
import { Paginated } from '../page/page.model';

export const paginateNotesParamsSchema = z.object({
  query: z.string().optional(),
  tag: z.string().optional(),
  take: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  status: z.enum(['active', 'archived']).optional(),
});

export type PaginateNotesRequestParams = z.infer<typeof paginateNotesParamsSchema>;

export type PaginateNotesResponseItemDto = {
  id: string;
  title: string;
  tags: string[];
  createdAt: string;
  archived: boolean;
};

export type PaginateNotesResponseDto = Paginated<PaginateNotesResponseItemDto>;
