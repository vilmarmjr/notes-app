import { FieldsErrors } from '@common/models';
import { HttpStatus, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ApplicationException } from '../http/application.exception';

class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform<T>(value: T): T {
    const { success, data, error } = this.schema.safeParse(value);

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
