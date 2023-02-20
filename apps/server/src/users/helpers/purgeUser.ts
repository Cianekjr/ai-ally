import { User as UserType } from 'db';

export const purgeUser = (user: UserType): UserType => {
  return {
    ...user,
    password: '',
    refreshToken: null,
    refreshTokenExp: null,
    confirmationToken: null,
    confirmationDate: null,
    forgotPasswordToken: null,
    forgotPasswordDate: null,
  };
};
