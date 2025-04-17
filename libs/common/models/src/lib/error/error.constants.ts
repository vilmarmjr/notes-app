export const AuthErrors = {
  EMAIL_IS_ALREADY_TAKEN: 'EMAIL_IS_ALREADY_TAKEN',
  EMAIL_IS_BEING_USED_WITH_ANOTHER_SIGN_IN_METHOD:
    'EMAIL_IS_BEING_USED_WITH_ANOTHER_SIGN_IN_METHOD',
  INCORRECT_EMAIL_OR_PASSWORD: 'INCORRECT_EMAIL_OR_PASSWORD',
  UNAUTHORIZED: 'UNAUTHORIZED',
  OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT: 'OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT',
  INVALID_OLD_PASSWORD: 'INVALID_OLD_PASSWORD',
  INVALID_OR_EXPIRED_ACCESS_TOKEN: 'INVALID_OR_EXPIRED_ACCESS_TOKEN',
  SIGN_IN_METHOD_NOT_ALLOWED: 'SIGN_IN_METHOD_NOT_ALLOWED',
} as const;

export type AuthError = (typeof AuthErrors)[keyof typeof AuthErrors];

export const NotesErrors = {
  NOTE_NOT_FOUND: 'NOTE_NOT_FOUND',
} as const;

export type NotesError = (typeof NotesErrors)[keyof typeof NotesErrors];

export const FieldsErrors = {
  INVALID_FIELDS: 'INVALID_FIELDS',
} as const;

export type FieldsError = (typeof FieldsErrors)[keyof typeof FieldsErrors];

export type ApplicationError = AuthError | NotesError | FieldsError;
