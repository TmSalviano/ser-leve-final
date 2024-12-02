import { Controller, Post, Get, Param, Body, Delete, Put } from '@nestjs/common';
import { ReceitaRepository } from './receita.repository';
import { ReceitaDTO } from './dtos/receita.dto'; // Import custom DTO

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaRepo: ReceitaRepository) {}

  @Post()
  async createReceita(@Body() receitaData: ReceitaDTO) {
    return this.receitaRepo.createReceita(receitaData);
  }

  @Get(':id')
  async getReceitaById(@Param('id') id: string) {
    return this.receitaRepo.getReceitaById(+id);
  }

  @Get('usuario/:usuarioId')
  async getAllReceitasByUsuarioId(@Param('usuarioId') usuarioId: string) {
    return this.receitaRepo.getAllReceitasByUsuarioId(+usuarioId);
  }

  @Put(':id')
  async updateReceitaById(
    @Param('id') id: string,
    @Body() receitaData: ReceitaDTO,
  ) {
    return this.receitaRepo.updateReceitaById(+id, receitaData);
  }

  @Delete(':id')
  async deleteReceitaById(@Param('id') id: string) {
    return this.receitaRepo.deleteReceitaById(+id);
  }

  @Post('main-feed')
  async getMainFeed(@Body() usuarioIds: number[]) {
    return this.receitaRepo.getMainFeed(usuarioIds);
  }

   @Get('random') 
   async getRandomReceitas() {
      return this.receitaRepo.getRandomReceitas();
   }
}
