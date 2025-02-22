import { HttpStatus, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ApplicationException } from './application.exception';
import { FieldsError } from './errors';

class ValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  transform(value: T): T {
    const { success, data, error } = this.schema.safeParse(value);

    if (success) {
      return data;
    }

    throw new ApplicationException(FieldsError.INVALID_FIELDS, HttpStatus.BAD_REQUEST, {
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
