import { z } from 'zod';

export const signupRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupRequestDto = z.infer<typeof signupRequestSchema>;

export type SignupResponseDto = {
  id: string;
  email: string;
  token: string;
};
