import { ApplicationError, AuthErrors, FieldsErrors, NotesErrors } from '@common/models';

export const errorMessages: Record<ApplicationError, string> = {
  [AuthErrors.EMAIL_IS_ALREADY_TAKEN]: 'Email is already taken',
  [AuthErrors.EMAIL_IS_BEING_USED_WITH_ANOTHER_SIGN_IN_METHOD]:
    'The provided email is being used with another sign in method',
  [AuthErrors.INCORRECT_EMAIL_OR_PASSWORD]: 'Incorrect email or password',
  [AuthErrors.UNAUTHORIZED]:
    'You are not authorized to perform this action. Please log in to continue',
  [AuthErrors.INVALID_OLD_PASSWORD]: 'Invalid old password',
  [AuthErrors.OLD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT]:
    'Old and new password must be different',
  [AuthErrors.INVALID_OR_EXPIRED_ACCESS_TOKEN]: 'The session is expired',
  [AuthErrors.SIGN_IN_METHOD_NOT_ALLOWED]: 'Sign in method not allowed',
  [FieldsErrors.INVALID_FIELDS]: 'Invalid fields',
  [NotesErrors.NOTE_NOT_FOUND]: 'Note not found',
};
