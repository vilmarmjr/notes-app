import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupDto = z.infer<typeof signupSchema>;

export type SignupResponseDto = {
  id: string;
  email: string;
  token: string;
};
