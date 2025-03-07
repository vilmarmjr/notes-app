export const AuthErrors = {
  EMAIL_IS_ALREADY_TAKEN: 'EMAIL_IS_ALREADY_TAKEN',
  INCORRECT_EMAIL_OR_PASSWORD: 'INCORRECT_EMAIL_OR_PASSWORD',
  UNAUTHORIZED: 'UNAUTHORIZED',
  OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT: 'OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT',
  INVALID_OLD_PASSWORD: 'INVALID_OLD_PASSWORD',
} as const;

export type AuthError = (typeof AuthErrors)[keyof typeof AuthErrors];

export const FieldsErrors = {
  INVALID_FIELDS: 'INVALID_FIELDS',
} as const;

export type FieldsError = (typeof FieldsErrors)[keyof typeof FieldsErrors];

export type ApplicationError = AuthError | FieldsError;
