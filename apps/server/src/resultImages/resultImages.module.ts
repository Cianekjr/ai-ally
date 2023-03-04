import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ResultImagesResolver } from './resultImages.resolver'
import { ResultImagesService } from './resultImages.service'

@Module({
  providers: [ResultImagesService, PrismaService, ResultImagesResolver],
})
export class ResultImagesModule {}
