import { ApplicationError } from '@common/constants';

export type ErrorResponse = {
  statusCode: number;
  message: ApplicationError;
  details?: object;
};
