import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from './interfaces/userPayload';

import { addWeeks, addDays } from 'date-fns';
import { User as UserType, Prisma } from 'db';
import { generateRandomToken, hashCompare, hashValue } from 'src/common/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<UserType> {
    const user = await this.usersService.getFullUser({ email });

    if (!user) {
      throw new ForbiddenException('User with followed email does not exist');
    }
    const arePasswordsMatch = await hashCompare(password, user.password);
    if (!arePasswordsMatch) {
      throw new ForbiddenException('Incorrect password');
    }
    return {
      ...user,
      password: '',
      refreshToken: '',
      refreshTokenExp: null,
    };
  }

  async registerUser(user: Prisma.UserCreateInput): Promise<UserType> {
    const hashedPassword = await hashValue(user.password);

    try {
      const createdUser = await this.usersService.createUser({
        ...user,
        password: hashedPassword,
      });

      return {
        ...createdUser,
        password: '',
        refreshToken: '',
        refreshTokenExp: null,
      };
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ForbiddenException({
          message: 'This email is already registered',
          code: e.code,
        });
      }
      throw e;
    }
  }

  async getUserProfile(user: UserJwtPayload): Promise<UserType> {
    const userData = await this.usersService.getUser({ id: user.sub });

    if (!userData) {
      throw new ForbiddenException('JWT subject does not exist');
    }

    return userData;
  }

  generateJwtToken(user: Pick<UserType, 'email' | 'id'>): string {
    const payload: UserJwtPayload = { email: user.email, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(
    user: Pick<UserType, 'email' | 'id'>,
  ): Promise<UserType['refreshToken']> {
    const userDataToUpdate = {
      refreshToken: generateRandomToken(),
      refreshTokenExp: addWeeks(new Date(), 1),
    };

    await this.usersService.updateUser(
      {
        id: user.id,
      },
      userDataToUpdate,
    );
    return userDataToUpdate.refreshToken;
  }

  generateConfirmationToken(): {
    confirmationToken: NonNullable<UserType['confirmationToken']>;
    confirmationDate: NonNullable<UserType['confirmationDate']>;
  } {
    const confirmationData = {
      confirmationToken: generateRandomToken(),
      confirmationDate: addDays(new Date(), 2),
    };

    return confirmationData;
  }

  generateForgotPasswordToken(): {
    forgotPasswordToken: NonNullable<UserType['forgotPasswordToken']>;
    forgotPasswordDate: NonNullable<UserType['forgotPasswordDate']>;
  } {
    const forgotPasswordData = {
      forgotPasswordToken: generateRandomToken(),
      forgotPasswordDate: addDays(new Date(), 2),
    };

    return forgotPasswordData;
  }
}
