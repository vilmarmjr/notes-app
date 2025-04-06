import { z } from 'zod';

import 'dotenv/config';

const envSchema = z.object({
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
