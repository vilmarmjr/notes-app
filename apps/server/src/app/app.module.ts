import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@server/auth';
import { NotesModule } from '@server/notes';
import { SettingsModule } from '@server/settings';
import { UsersModule } from '@server/users';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    SettingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notes',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
