import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesBusinessResolver } from './profilesBusiness.resolver';
import { ProfilesBusinessService } from './profilesBusiness.service';

@Module({
  providers: [ProfilesBusinessService, ProfilesBusinessResolver, PrismaService],
  exports: [ProfilesBusinessService],
})
export class ProfilesBusinessModule {}
