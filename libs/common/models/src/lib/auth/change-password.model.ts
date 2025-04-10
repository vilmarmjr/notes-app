import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from './auth.constants';

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(PASSWORD_MIN_LENGTH),
});

export type ChangePasswordRequestDto = z.infer<typeof changePasswordSchema>;

export type ChangePasswordResponseDto = {
  accessToken: string;
};
