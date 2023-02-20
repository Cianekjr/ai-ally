import { ForbiddenException, Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { User as UserType, Prisma } from 'db';
import { PrismaService } from 'src/prisma/prisma.service';
import { purgeUser } from './helpers/purgeUser';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<UserType | null> {
    const user = await this.prisma.user.findUnique({
      where,
    });

    if (!user) return null;

    return purgeUser(user);
  }

  async getFullUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserType | null> {
    return await this.prisma.user.findUnique({
      where,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserType> {
    const user = await this.prisma.user.create({
      data,
    });

    return purgeUser(user);
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<UserType> {
    return await this.prisma.user.update({
      where,
      data,
    });
  }

  async validateRefreshToken(
    where: Prisma.UserWhereUniqueInput,
    refreshToken: UserType['refreshToken'],
  ): Promise<UserType> {
    const user = await this.prisma.user.findUnique({
      where,
    });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    if (!user.refreshToken || !user.refreshTokenExp) {
      throw new ForbiddenException('User has not refresh token');
    }

    if (user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Refresh token is invalid');
    }

    const refreshTokenExpirationDate = new Date(user.refreshTokenExp);
    const currentDate = new Date();

    if (!isAfter(refreshTokenExpirationDate, currentDate)) {
      throw new ForbiddenException('Refresh token is expired');
    }

    return purgeUser(user);
  }
}
