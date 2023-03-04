import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ResultImagesService } from 'src/resultImages/resultImages.service'
import { DiscordController } from './discord.controller'
import { DiscordService } from './discord.service'

@Module({
  controllers: [DiscordController],
  providers: [DiscordService, PrismaService, ResultImagesService],
})
export class DiscordModule {}
