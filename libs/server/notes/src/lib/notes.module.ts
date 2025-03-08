import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './controllers/notes.controller';
import { Note } from './entities/note.entity';
import { Tag } from './entities/tag.entity';
import { CreateNoteUseCase } from './usecases/create-note.usecase';
import { GetNoteByIdUseCase } from './usecases/get-note-by-id.usecase';
import { UpdateNoteUseCase } from './usecases/update-note.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  controllers: [NotesController],
  providers: [GetNoteByIdUseCase, CreateNoteUseCase, UpdateNoteUseCase],
  exports: [],
})
export class NotesModule {}
