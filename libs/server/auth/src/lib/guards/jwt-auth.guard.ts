import { AuthErrors } from '@common/models';
import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationException, IS_PUBLIC_KEY } from '@server/shared';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<User>(err: unknown, user: User) {
    if (err || !user) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
