import { Test, TestingModule } from '@nestjs/testing';
import { ReceitaRepository } from './receita.repository';

describe('ReceitaRepository', () => {
  let provider: ReceitaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceitaRepository],
    }).compile();

    provider = module.get<ReceitaRepository>(ReceitaRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
