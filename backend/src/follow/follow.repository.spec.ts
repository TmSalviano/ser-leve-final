import { Test, TestingModule } from '@nestjs/testing';
import { FollowRepository } from './follow.repository';

describe('FollowRepository', () => {
  let provider: FollowRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowRepository],
    }).compile();

    provider = module.get<FollowRepository>(FollowRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
