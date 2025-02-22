import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;

export type LoginResponseDto = {
  id: string;
  email: string;
  token: string;
};
