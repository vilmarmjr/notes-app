import { z } from 'zod';

export const authorizeRequestSchema = z.object({
  oneTimeToken: z.string(),
});

export type AuthorizeRequestDto = z.infer<typeof authorizeRequestSchema>;

export type AuthorizeResponseDto = {
  accessToken: string;
};
