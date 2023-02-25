import { Test, TestingModule } from '@nestjs/testing'
import { MailerService } from './mailer.service'

describe('MailerService', () => {
  let service: MailerService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile()

    service = module.get<MailerService>(MailerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
