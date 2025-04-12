import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@server/auth';
import { NotesModule } from '@server/notes';
import { SettingsModule } from '@server/settings';
import { env } from '@server/shared';
import { UsersModule } from '@server/users';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    SettingsModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: env.POSTGRES_HOST,
          port: env.POSTGRES_PORT,
          username: env.POSTGRES_USERNAME,
          password: env.POSTGRES_PASSWORD,
          database: env.POSTGRES_DB,
          synchronize: false,
          autoLoadEntities: true,
          logging: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
})
export class AppModule {}
