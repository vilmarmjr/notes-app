import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';

@Module({
  controllers: [NotesController],
  providers: [],
  exports: [],
})
export class NotesModule {}
