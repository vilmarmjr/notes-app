import { Response } from 'express';

const ACCESS_TOKEN_KEY = 'notes-at';

export function setTokenCookie(token: string, response: Response) {
  response.cookie(ACCESS_TOKEN_KEY, token, { httpOnly: true, sameSite: 'strict' });
}

export function clearTokenCookie(response: Response) {
  response.clearCookie(ACCESS_TOKEN_KEY);
}
