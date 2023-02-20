import { Injectable } from '@nestjs/common';
import {
  Prisma,
  ProfileInfluencer as ProfileInfluencerType,
} from 'db';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesInfluencerService {
  constructor(private readonly prisma: PrismaService) { }

  async getProfileInfluencer(
    where: Prisma.ProfileInfluencerWhereUniqueInput,
  ): Promise<ProfileInfluencerType | null> {
    return await this.prisma.profileInfluencer.findUnique({
      where,
    });
  }

  async createProfileInfluencer(
    data: Prisma.ProfileInfluencerCreateInput,
  ): Promise<ProfileInfluencerType> {
    return await this.prisma.profileInfluencer.create({
      data,
    });
  }

  async updateProfileInfluencer(
    where: Prisma.ProfileInfluencerWhereUniqueInput,
    data: Prisma.ProfileInfluencerUpdateInput,
  ): Promise<ProfileInfluencerType> {
    return await this.prisma.profileInfluencer.update({
      where,
      data,
    });
  }
}
