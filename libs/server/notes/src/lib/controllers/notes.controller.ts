import {
  archiveNoteParamsSchema,
  ArchiveNoteRequestParams,
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  createNoteSchema,
  getNoteParamsSchema,
  GetNoteRequestParams,
  paginateNotesParamsSchema,
  PaginateNotesRequestDto,
  restoreNoteParamsSchema,
  RestoreNoteRequestParams,
  UpdateNoteRequestDto,
  UpdateNoteResponseDto,
  updateNoteSchema,
} from '@common/models';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { ArchiveNoteUseCase } from '../usecases/archive-note.usecase';
import { CreateNoteUseCase } from '../usecases/create-note.usecase';
import { GetNoteByIdUseCase } from '../usecases/get-note-by-id.usecase';
import { PaginateNotesUseCase } from '../usecases/paginate-notes.usecase';
import { RestoreNoteUseCase } from '../usecases/restore-note.usecase';
import { UpdateNoteUseCase } from '../usecases/update-note.usecase';

@Controller('notes')
export class NotesController {
  constructor(
    private _createNoteUseCase: CreateNoteUseCase,
    private _updateNoteUseCase: UpdateNoteUseCase,
    private _getNoteByIdUseCase: GetNoteByIdUseCase,
    private _archiveNoteUseCase: ArchiveNoteUseCase,
    private _restoreNoteUseCase: RestoreNoteUseCase,
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
    @Query(validateSchema(paginateNotesParamsSchema)) dto: PaginateNotesRequestDto,
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

  @Put(':id/archive')
  @HttpCode(HttpStatus.NO_CONTENT)
  archiveNote(
    @Param(validateSchema(archiveNoteParamsSchema)) params: ArchiveNoteRequestParams,
    @Req() req: ApplicationRequest,
  ) {
    this._archiveNoteUseCase.execute(req.user.id, params);
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  restoreNote(
    @Param(validateSchema(restoreNoteParamsSchema)) params: RestoreNoteRequestParams,
    @Req() req: ApplicationRequest,
  ) {
    this._restoreNoteUseCase.execute(req.user.id, params);
  }
}
