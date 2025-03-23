import { AuthErrors } from '@common/models';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationException } from '@server/shared';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<User>(err: unknown, user: User) {
    if (err || !user) {
      throw new ApplicationException(AuthErrors.INCORRECT_EMAIL_OR_PASSWORD);
    }
    return user;
  }
}
