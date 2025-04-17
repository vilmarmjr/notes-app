export const SignInMethods = {
  EMAIL_AND_PASSWORD: 'EMAIL_AND_PASSWORD',
  GOOGLE: 'GOOGLE',
} as const;

export type SignInMethod = (typeof SignInMethods)[keyof typeof SignInMethods];
