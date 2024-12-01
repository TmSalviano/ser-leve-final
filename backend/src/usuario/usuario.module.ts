import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { DevDbModule } from 'src/dev-db/dev-db.module';
import { UsuarioRepository } from './usuario.repository';

@Module({
    imports: [DevDbModule], //This allows us to use the PrismaService inside UsuarioController
    controllers: [UsuarioController], 
    providers: [UsuarioRepository],
}) //This decorator tells you taht this is a module definition
export class UsuarioModule {}
