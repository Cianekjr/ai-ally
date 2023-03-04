import { Test, TestingModule } from '@nestjs/testing'
import { DiscordService } from './discord.service'

describe('DiscordService', () => {
  let service: DiscordService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordService],
    }).compile()

    service = module.get<DiscordService>(DiscordService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
