import { Response } from 'express';
import { ACCESS_TOKEN_KEY } from '../constants/token.constants';

export function setTokenCookie(token: string, response: Response) {
  response.cookie(ACCESS_TOKEN_KEY, token, { httpOnly: true, sameSite: 'lax' });
}

export function clearTokenCookie(response: Response) {
  response.clearCookie(ACCESS_TOKEN_KEY);
}
