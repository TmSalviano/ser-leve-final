import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TempModule } from './temp/temp.module';

//Modules: a section of your backend
@Module({
  //Imports other modules to this one
  //This is important because sometimes one module depends on another module. 
  //Cyclical Module Dependecny: A depends on B and B depends on A. BIG ARCHITECTURAL MISTAKE
  imports: [UsuarioModule, TempModule],
  //reponsible for http requests and responses
  controllers: [AppController],
  //every injectable thing that is not a controller
  providers: [AppService],
})
export class AppModule {}
