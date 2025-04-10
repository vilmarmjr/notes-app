import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from './auth.constants';

export const signUpRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export type SignUpRequestDto = z.infer<typeof signUpRequestSchema>;

export type SignUpResponseDto = {
  accessToken: string;
};
