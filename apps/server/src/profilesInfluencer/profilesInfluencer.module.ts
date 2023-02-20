import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesInfluencerResolver } from './profilesInfluencer.resolver';
import { ProfilesInfluencerService } from './profilesInfluencer.service';

@Module({
  providers: [
    ProfilesInfluencerService,
    ProfilesInfluencerResolver,
    PrismaService,
  ],
  exports: [ProfilesInfluencerService],
})
export class ProfilesInfluencerModule {}
