import { AuthErrors } from '@common/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationException } from '../core/validation/application.exception';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<User>(err: unknown, user: User) {
    if (err || !user) {
      throw new ApplicationException(AuthErrors.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
