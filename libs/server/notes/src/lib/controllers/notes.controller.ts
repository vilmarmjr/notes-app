import { Controller, Get } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get()
  getNotes() {
    return ['note1', 'note2'];
  }
}
