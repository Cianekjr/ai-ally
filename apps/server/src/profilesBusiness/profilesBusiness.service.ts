import { Injectable } from '@nestjs/common';
import { Prisma, ProfileBusiness as ProfileBusinessType } from 'db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesBusinessService {
  constructor(private readonly prisma: PrismaService) { }

  async getProfileBusiness(
    where: Prisma.ProfileBusinessWhereUniqueInput,
  ): Promise<ProfileBusinessType | null> {
    return await this.prisma.profileBusiness.findUnique({
      where,
    });
  }

  async createProfileBusiness(
    data: Prisma.ProfileBusinessCreateInput,
  ): Promise<ProfileBusinessType> {
    return await this.prisma.profileBusiness.create({
      data,
    });
  }

  async updateProfileBusiness(
    where: Prisma.ProfileBusinessWhereUniqueInput,
    data: Prisma.ProfileBusinessUpdateInput,
  ): Promise<ProfileBusinessType> {
    return await this.prisma.profileBusiness.update({
      where,
      data,
    });
  }
}
