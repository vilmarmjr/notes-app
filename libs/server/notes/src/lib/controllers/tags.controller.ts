import { Controller, Get, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared/http';
import { GetTagsUseCase } from '../usecases/get-tags.usecase';

@Controller('tags')
export class TagsController {
  constructor(private _getTagsUseCase: GetTagsUseCase) {}

  @Get()
  getTags(@Req() req: ApplicationRequest) {
    return this._getTagsUseCase.execute(req.user.id);
  }
}
