import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesBusinessService } from './profilesBusiness.service';

describe.skip('ProfilesBusinessService', () => {
  let service: ProfilesBusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesBusinessService],
    }).compile();

    service = module.get<ProfilesBusinessService>(ProfilesBusinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
