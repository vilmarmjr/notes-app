import { GetMeResponse } from '@common/models';
import { Controller, Get, Req } from '@nestjs/common';
import { ApplicationRequest } from '@server/shared';

@Controller('users')
export class UsersController {
  @Get('me')
  getMe(@Req() req: ApplicationRequest): GetMeResponse {
    return {
      id: req.user.id,
      email: req.user.email,
      signInMethod: req.user.signInMethod,
    };
  }
}
