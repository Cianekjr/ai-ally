export interface MessagePayload {
  id: string
  author: {
    username: string
  }
  attachments: {
    url: string
    width: number
    height: number
  }[]
  content: string
  message_reference?: {
    guild_id: string
    channel_id: string
    message_id: string
  }
}
