import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationException, env } from '@server/shared';
import type { Response } from 'express';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  handleRequest<User>(
    err: unknown,
    user: User,
    info: unknown,
    context: ExecutionContext,
  ) {
    if (err instanceof ApplicationException) {
      const response: Response = context.switchToHttp().getResponse();
      return response.redirect(`${env.FRONTEND_URL}/login?error=${err.message}`);
    }
    return user;
  }
}
