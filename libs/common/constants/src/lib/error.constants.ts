export const AuthErrors = {
  EMAIL_IS_ALREADY_TAKEN: 'EMAIL_IS_ALREADY_TAKEN',
  INCORRECT_EMAIL_OR_PASSWORD: 'INCORRECT_EMAIL_OR_PASSWORD',
  UNAUTHORIZED: 'UNAUTHORIZED',
} as const;

export type AuthError = (typeof AuthErrors)[keyof typeof AuthErrors];

export const FieldsErrors = {
  INVALID_FIELDS: 'INVALID_FIELDS',
};

export type FieldsError = (typeof FieldsErrors)[keyof typeof FieldsErrors];

export type ApplicationError = AuthError | FieldsError;
