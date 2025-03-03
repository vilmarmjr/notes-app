import { Request } from 'express';
import { User } from '../../user/user.entity';

export type ApplicationRequest = Omit<Request, 'user'> & {
  user: User;
};
