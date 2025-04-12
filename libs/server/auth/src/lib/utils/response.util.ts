import { CookieOptions, Response } from 'express';
import {
  REFRESH_TOKEN_EXPIRATION_IN_DAYS,
  REFRESH_TOKEN_KEY,
} from '../constants/token.constants';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};

export function setRefreshTokenCookie(token: string, response: Response) {
  response.cookie(REFRESH_TOKEN_KEY, token, {
    ...cookieOptions,
    maxAge: REFRESH_TOKEN_EXPIRATION_IN_DAYS * 24 * 60 * 60 * 1000,
  });
}

export function clearRefreshTokenCookie(response: Response) {
  response.clearCookie(REFRESH_TOKEN_KEY, cookieOptions);
}
