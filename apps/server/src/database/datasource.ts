import { DataSource } from 'typeorm';
import { env } from '../env';

export default new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  migrations: ['apps/server/src/database/migrations/*.ts'],
});
