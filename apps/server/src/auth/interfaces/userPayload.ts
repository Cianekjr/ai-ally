import { User as UserType } from 'db';

export interface UserJwtPayload {
  sub: UserType['id'];
  email: UserType['email'];
}
