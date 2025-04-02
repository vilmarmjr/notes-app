import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@server/auth';
import { NotesModule } from '@server/notes';
import { SettingsModule } from '@server/settings';
import { UsersModule } from '@server/users';
import { env } from '../env';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: env.POSTGRES_PORT,
      username: env.POSTGRES_USERNAME,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      synchronize: false,
      autoLoadEntities: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
