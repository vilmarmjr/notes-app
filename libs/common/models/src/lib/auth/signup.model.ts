import { z } from 'zod';

export const signUpRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpRequestDto = z.infer<typeof signUpRequestSchema>;

export type SignUpResponseDto = {
  id: string;
  email: string;
};
