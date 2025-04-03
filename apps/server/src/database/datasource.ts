import { env } from '@server/shared';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  migrations: ['apps/server/src/database/migrations/*.ts'],
});
