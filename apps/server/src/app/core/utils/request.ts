import { Request } from 'express';
import { ACCESS_TOKEN_KEY } from '../constants/token';

export function extractTokenFromCookies(req: Request): string | null {
  if (
    req.cookies &&
    req.cookies[ACCESS_TOKEN_KEY] &&
    req.cookies[ACCESS_TOKEN_KEY].length > 0
  ) {
    return req.cookies[ACCESS_TOKEN_KEY];
  }
  return null;
}
