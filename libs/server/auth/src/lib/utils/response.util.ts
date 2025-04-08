import { CookieOptions, Response } from 'express';
import { ACCESS_TOKEN_KEY } from '../constants/token.constants';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
};

export function setTokenCookie(token: string, response: Response) {
  response.cookie(ACCESS_TOKEN_KEY, token, cookieOptions);
}

export function clearTokenCookie(response: Response) {
  response.clearCookie(ACCESS_TOKEN_KEY, cookieOptions);
}
