import { ApplicationError } from '@common/constants';
import { ErrorResponse } from '@common/models';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor(
    error: ApplicationError,
    status = HttpStatus.UNPROCESSABLE_ENTITY,
    details?: object,
  ) {
    const response: ErrorResponse = { statusCode: status, message: error, details };
    super(response, status);
  }
}
