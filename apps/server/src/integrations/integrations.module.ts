import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IntegrationsResolver } from './integrations.resolver';
import { IntegrationsService } from './integrations.service';

@Module({
  imports: [HttpModule],
  providers: [IntegrationsService, IntegrationsResolver, PrismaService],
  exports: [IntegrationsService],
})
export class IntegrationsModule {}
