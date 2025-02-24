import { ApplicationError } from '@common/constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor(
    error: ApplicationError,
    status = HttpStatus.UNPROCESSABLE_ENTITY,
    details?: object,
  ) {
    super({ statusCode: status, message: error, details }, status);
  }
}
