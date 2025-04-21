import { SignInMethod } from '../auth/sign-in-method.model';

export type GetMeResponse = {
  id: string;
  email: string;
  signInMethod: SignInMethod;
};
