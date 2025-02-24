import { z } from 'zod';

export const logInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LogInRequestDto = z.infer<typeof logInRequestSchema>;

export type LogInResponseDto = {
  id: string;
  email: string;
};
