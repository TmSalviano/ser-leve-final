import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoRepository } from './notificacao.repository';

describe('NotificacaoRepository', () => {
  let provider: NotificacaoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificacaoRepository],
    }).compile();

    provider = module.get<NotificacaoRepository>(NotificacaoRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
