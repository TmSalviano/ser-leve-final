import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

@Module({
  controllers: [UsuarioController],
}) //This decorator tells you taht this is a module definition
export class UsuarioModule {}
