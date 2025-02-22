export enum AuthError {
  EMAIL_ALREADY_TAKEN = 'EMAIL_IS_ALREADY_TAKEN',
  INCORRECT_EMAIL_OR_PASSWORD = 'INCORRECT_EMAIL_OR_PASSWORD',
}

export enum FieldsError {
  INVALID_FIELDS = 'INVALID_FIELDS',
}

export type ApplicationError = AuthError | FieldsError;
