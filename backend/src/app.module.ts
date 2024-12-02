import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { DevDbModule } from './dev-db/dev-db.module';
import { FollowModule } from './follow/follow.module';
import { ReceitaModule } from './receita/receita.module';
import { NotificacaoModule } from './notificacao/notificacao.module';

//Modules: a section of your backend
@Module({
  //Imports other modules to this one
  //This is important because sometimes one module depends on another module. 
  //Cyclical Module Dependecny: A depends on B and B depends on A. BIG ARCHITECTURAL MISTAKE
  imports: [UsuarioModule, DevDbModule, FollowModule, ReceitaModule, NotificacaoModule], // I should be able to call follow repo methods in usuarios modulw now
  //reponsible for http requests and responses
  controllers: [AppController],
  //every injectable thing that is not a controller
  providers: [AppService],
})
export class AppModule {}
