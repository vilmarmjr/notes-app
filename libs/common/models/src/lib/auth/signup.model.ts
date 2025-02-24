import { PASSWORD_MIN_LENGTH } from '@common/constants';
import { z } from 'zod';

export const signUpRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export type SignUpRequestDto = z.infer<typeof signUpRequestSchema>;

export type SignUpResponseDto = {
  id: string;
  email: string;
};
