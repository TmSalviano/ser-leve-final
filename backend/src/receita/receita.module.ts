import { Module } from '@nestjs/common';
import { ReceitaController } from './receita.controller';
import { ReceitaRepository } from './receita.repository';
import { DevDbModule } from 'src/dev-db/dev-db.module';

@Module({
  imports: [DevDbModule],
  controllers: [ReceitaController],
  providers: [ReceitaRepository],
  exports: [ReceitaRepository],
})
export class ReceitaModule {}
