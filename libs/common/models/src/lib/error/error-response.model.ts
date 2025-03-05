import { ApplicationError } from './error.constants';

export type ErrorResponse = {
  statusCode: number;
  message: ApplicationError;
  details?: object;
};
