import { Controller } from '@nestjs/common'
import fetch from 'node-fetch'
import { Cron } from '@nestjs/schedule'
import { MessagePayload } from './interfaces/messagesPayload'
import { DiscordService } from './discord.service'
import { ConfigService } from '@nestjs/config'
import { ResultImagesService } from 'src/resultImages/resultImages.service'

@Controller('discord')
export class DiscordController {
  constructor(private discordService: DiscordService, private configService: ConfigService, private resultImagesService: ResultImagesService) {}

  @Cron('*/20 * * * * *')
  async handleCron() {
    const res = await fetch('https://discord.com/api/v9/channels/997260939135025223/messages?limit=50', {
      headers: {
        Authorization: this.configService.get<string>('DISCORD_TOKEN') || '',
      },
    })

    const data: MessagePayload[] = await res.json()

    const prefilteredItems = this.discordService.prefilterItems(data)

    const preparedItems = this.discordService.prepareItemsToUpload(prefilteredItems)

    await this.resultImagesService.createManyResultImages(preparedItems)
  }
}
