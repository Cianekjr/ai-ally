import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesInfluencerService } from './profilesInfluencer.service';

describe.skip('ProfilesInfluencerService', () => {
  let service: ProfilesInfluencerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesInfluencerService],
    }).compile();

    service = module.get<ProfilesInfluencerService>(ProfilesInfluencerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
