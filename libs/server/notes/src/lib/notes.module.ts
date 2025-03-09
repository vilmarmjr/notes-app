import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './controllers/notes.controller';
import { TagsController } from './controllers/tags.controller';
import { Note } from './entities/note.entity';
import { Tag } from './entities/tag.entity';
import { CreateNoteUseCase } from './usecases/create-note.usecase';
import { GetNoteByIdUseCase } from './usecases/get-note-by-id.usecase';
import { GetTagsUseCase } from './usecases/get-tags.usecase';
import { PaginateNotesUseCase } from './usecases/paginate-notes.usecase';
import { UpdateNoteUseCase } from './usecases/update-note.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  controllers: [NotesController, TagsController],
  providers: [
    GetNoteByIdUseCase,
    CreateNoteUseCase,
    UpdateNoteUseCase,
    GetTagsUseCase,
    PaginateNotesUseCase,
  ],
  exports: [],
})
export class NotesModule {}
