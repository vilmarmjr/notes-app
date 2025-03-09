import {
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  createNoteSchema,
  getNoteParamsSchema,
  GetNoteRequestParams,
  PaginateNotesRequestDto,
  paginateNotesSchema,
  UpdateNoteRequestDto,
  UpdateNoteResponseDto,
  updateNoteSchema,
} from '@common/models';
import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { CreateNoteUseCase } from '../usecases/create-note.usecase';
import { GetNoteByIdUseCase } from '../usecases/get-note-by-id.usecase';
import { PaginateNotesUseCase } from '../usecases/paginate-notes.usecase';
import { UpdateNoteUseCase } from '../usecases/update-note.usecase';

@Controller('notes')
export class NotesController {
  constructor(
    private _createNoteUseCase: CreateNoteUseCase,
    private _updateNoteUseCase: UpdateNoteUseCase,
    private _getNoteByIdUseCase: GetNoteByIdUseCase,
    private _paginateNotesUseCase: PaginateNotesUseCase,
  ) {}

  @Post()
  createNote(
    @Body(validateSchema(createNoteSchema)) dto: CreateNoteRequestDto,
    @Req() req: ApplicationRequest,
  ): Promise<CreateNoteResponseDto> {
    return this._createNoteUseCase.execute(req.user.id, dto);
  }

  @Put()
  updateNote(
    @Body(validateSchema(updateNoteSchema)) dto: UpdateNoteRequestDto,
    @Req() req: ApplicationRequest,
  ): Promise<UpdateNoteResponseDto> {
    return this._updateNoteUseCase.execute(req.user.id, dto);
  }

  @Get()
  paginateNotes(
    @Query(validateSchema(paginateNotesSchema)) dto: PaginateNotesRequestDto,
    @Req() req: ApplicationRequest,
  ) {
    return this._paginateNotesUseCase.execute(req.user.id, dto);
  }

  @Get(':id')
  getNoteById(
    @Param(validateSchema(getNoteParamsSchema)) params: GetNoteRequestParams,
    @Req() req: ApplicationRequest,
  ) {
    return this._getNoteByIdUseCase.execute({ noteId: params.id, userId: req.user.id });
  }
}
