import { Module } from '@nestjs/common';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoRepository } from './notificacao.repository';
import { DevDbModule } from 'src/dev-db/dev-db.module';

@Module({
  imports: [DevDbModule],
  controllers: [NotificacaoController],
  providers: [NotificacaoRepository]
})
export class NotificacaoModule {}
