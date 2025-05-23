import { z } from 'zod';

import 'dotenv/config';

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  JWT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  FRONTEND_URL: z.string(),
  REFRESH_TOKEN_COOKIE_DOMAIN: z.string(),
});

export const env = envSchema.parse(process.env);
