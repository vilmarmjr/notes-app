import { FieldsErrors } from '@common/models';
import { HttpStatus, PipeTransform } from '@nestjs/common';
import { ApplicationException } from '@server/shared/http';
import { ZodSchema } from 'zod';

class ValidationPipe implements PipeTransform {
  constructor(private _schema: ZodSchema) {}

  transform<T>(value: T): T {
    const { success, data, error } = this._schema.safeParse(value);

    if (success) {
      return data;
    }

    throw new ApplicationException(FieldsErrors.INVALID_FIELDS, HttpStatus.BAD_REQUEST, {
      issues: error.issues.map(issue => ({
        code: issue.code,
        message: issue.message,
        path: issue.path,
      })),
    });
  }
}

export function validateSchema(schema: ZodSchema) {
  return new ValidationPipe(schema);
}
