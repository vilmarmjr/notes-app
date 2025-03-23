import { Request } from 'express';
import { User } from '../entities/user.entity';

export type ApplicationRequest = Omit<Request, 'user'> & {
  user: User;
};
