import { FieldsErrors } from '@common/models';
import { HttpStatus, PipeTransform } from '@nestjs/common';
import { ApplicationException } from '@server/shared/http';
import { ZodSchema } from 'zod';

class ValidationPipe<T> implements PipeTransform {
  constructor(private _schema: ZodSchema<T>) {}

  transform(value: T): T {
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

export function validateSchema<T>(schema: ZodSchema<T>) {
  return new ValidationPipe(schema);
}
