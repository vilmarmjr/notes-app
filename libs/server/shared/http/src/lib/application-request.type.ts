import { User } from '@server/shared/entities';
import { Request } from 'express';

export type ApplicationRequest = Omit<Request, 'user'> & {
  user: User;
};
