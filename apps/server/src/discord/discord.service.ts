import { Injectable } from '@nestjs/common'
import { filterPromptMessage } from 'src/common/regex'
import { MessagePayload } from './interfaces/messagesPayload'

@Injectable()
export class DiscordService {
  prefilterItems(items: MessagePayload[]) {
    return items.filter((item) => {
      if (item.author.username !== 'Midjourney Bot') return false
      if (!item.attachments || item.attachments.length === 0 || !item.attachments[0].url.endsWith('.png')) return false
      if (!item.content.endsWith('(fast)')) return false
      if (item.content.includes('http')) return false
      return true
    })
  }

  prepareItemsToUpload(items: MessagePayload[]) {
    return items.map((item) => {
      const attachment = item.attachments[0]
      const messageRef = item.message_reference

      const data = {
        messageId: item.id,
        imageUrl: attachment.url,
        width: attachment.width,
        height: attachment.height,
        content: item.content.substring(0, 2998).match(filterPromptMessage)?.[1] || '',
        ...(messageRef ? { messageUrl: `https://discord.com/channels/${messageRef.guild_id}/${messageRef.channel_id}/${messageRef.message_id}` } : {}),
      }

      return data
    })
  }
}
