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
import { NotesService } from '../services/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private _notesService: NotesService) {}

  @Post()
  createNote(
    @Body(validateSchema(createNoteSchema)) dto: CreateNoteRequestDto,
    @Req() req: ApplicationRequest,
  ): Promise<CreateNoteResponseDto> {
    return this._notesService.createNote(req.user.id, dto);
  }

  @Get(':id')
  getNoteById(
    @Param(validateSchema(getNoteParamsSchema)) params: GetNoteRequestParams,
    @Req() req: ApplicationRequest,
  ) {
    return this._notesService.getNoteById({ noteId: params.id, userId: req.user.id });
  }
}
