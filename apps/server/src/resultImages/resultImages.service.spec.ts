import { Test, TestingModule } from '@nestjs/testing'
import { ResultImagesService } from './resultImages.service'

describe.skip('ResultImagesService', () => {
  let service: ResultImagesService

  beforeEach(async () => {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultImagesService],
    }).compile()

    service = module.get<ResultImagesService>(ResultImagesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
