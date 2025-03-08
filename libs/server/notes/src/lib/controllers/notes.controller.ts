import {
  CreateNoteRequestDto,
  CreateNoteResponseDto,
  createNoteSchema,
  getNoteParamsSchema,
  GetNoteRequestParams,
} from '@common/models';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { validateSchema } from '@server/shared/validation';
import { CreateNoteUseCase } from '../usecases/create-note.usecase';
import { GetNoteByIdUseCase } from '../usecases/get-note-by-id.usecase';

@Controller('notes')
export class NotesController {
  constructor(
    private _createNoteUseCase: CreateNoteUseCase,
    private _getNoteByIdUseCase: GetNoteByIdUseCase,
  ) {}

  @Post()
  createNote(
    @Body(validateSchema(createNoteSchema)) dto: CreateNoteRequestDto,
    @Req() req: ApplicationRequest,
  ): Promise<CreateNoteResponseDto> {
    return this._createNoteUseCase.execute(req.user.id, dto);
  }

  @Get(':id')
  getNoteById(
    @Param(validateSchema(getNoteParamsSchema)) params: GetNoteRequestParams,
    @Req() req: ApplicationRequest,
  ) {
    return this._getNoteByIdUseCase.execute({ noteId: params.id, userId: req.user.id });
  }
}
