import { Request } from 'express';
import { REFRESH_TOKEN_KEY } from '../constants/token.constants';

export function extractRefreshTokenFromCookies(req: Request): string | null {
  if (
    req.cookies &&
    req.cookies[REFRESH_TOKEN_KEY] &&
    req.cookies[REFRESH_TOKEN_KEY].length > 0
  ) {
    return req.cookies[REFRESH_TOKEN_KEY];
  }
  return null;
}
