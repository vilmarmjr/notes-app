import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginRequestDto = z.infer<typeof loginRequestSchema>;

export type LoginResponseDto = {
  id: string;
  email: string;
  token: string;
};
