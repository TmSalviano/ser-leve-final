import { Injectable } from '@nestjs/common';
import { ReceitaDTO } from './dtos/receita.dto'; // Import custom DTO
import { PrismaService } from 'src/dev-db/prisma.service';

@Injectable()
export class ReceitaRepository {
  constructor(private readonly prismaService: PrismaService) {}

    // Create a custom receita 
    async createReceita(data: ReceitaDTO): Promise<ReceitaDTO> {
        const createdReceita = await this.prismaService.receita.create({
          data: {
            UsuarioId: data.usuarioId,
            Titulo: data.titulo,
            Resumo: data.resumo,
            Descricao: data.descricao,
            Imagem: data.imagem,
            // 'Criado' is automatically set by Prisma (no need to provide it manually)
          },
        });
      
        return {
          id: createdReceita.Id,
          usuarioId: createdReceita.UsuarioId,
          titulo: createdReceita.Titulo,
          resumo: createdReceita.Resumo,
          descricao: createdReceita.Descricao,
          imagem: createdReceita.Imagem,
          criado: createdReceita.Criado,  // Prisma automatically assigns this
        };
      }

    async getReceitaById(id: number): Promise<ReceitaDTO | null> {
    const receita = await this.prismaService.receita.findUnique({
        where: { Id: id },
    });

    if (!receita) return null;

    return {
        id: receita.Id,
        usuarioId: receita.UsuarioId,
        titulo: receita.Titulo,
        resumo: receita.Resumo,
        descricao: receita.Descricao,
        imagem: receita.Imagem,
        criado: receita.Criado,
    };
    }

    async getAllReceitasByUsuarioId(usuarioId: number): Promise<ReceitaDTO[]> {
    const receitas = await this.prismaService.receita.findMany({
        where: { UsuarioId: usuarioId },
        orderBy: { Criado: 'desc' }, // Sort by creation date (descending)
    });

    return receitas.map((receita) => ({
        id: receita.Id,
        usuarioId: receita.UsuarioId,
        titulo: receita.Titulo,
        resumo: receita.Resumo,
        descricao: receita.Descricao,
        imagem: receita.Imagem,
        criado: receita.Criado,
    }));
    }

    async updateReceitaById(id: number, data: ReceitaDTO): Promise<ReceitaDTO> {
    const updatedReceita = await this.prismaService.receita.update({
        where: { Id: id },
        data: {
        Titulo: data.titulo,
        Resumo: data.resumo,
        Descricao: data.descricao,
        Imagem: data.imagem,
        },
    });

    return {
        id: updatedReceita.Id,
        usuarioId: updatedReceita.UsuarioId,
        titulo: updatedReceita.Titulo,
        resumo: updatedReceita.Resumo,
        descricao: updatedReceita.Descricao,
        imagem: updatedReceita.Imagem,
        criado: updatedReceita.Criado,
    };
    }

    async deleteReceitaById(id: number): Promise<ReceitaDTO> {
    const deletedReceita = await this.prismaService.receita.delete({
        where: { Id: id },
    });

    return {
        id: deletedReceita.Id,
        usuarioId: deletedReceita.UsuarioId,
        titulo: deletedReceita.Titulo,
        resumo: deletedReceita.Resumo,
        descricao: deletedReceita.Descricao,
        imagem: deletedReceita.Imagem,
        criado: deletedReceita.Criado,
    };
    }

  // Specific Main and NewPost Components Functions
    // Get main feed for an array of UsuarioIds (custom)
    async getMainFeed(usuarioIds: number[]): Promise<ReceitaDTO[]> {
        const receitas = await this.prismaService.receita.findMany({
            where: {
            UsuarioId: {
                in: usuarioIds, // Filters by array of UsuarioIds
            },
            },
            orderBy: {
            Criado: 'desc', 
            },
        });

        return receitas.map((receita) => ({
            id: receita.Id,
            usuarioId: receita.UsuarioId,
            titulo: receita.Titulo,
            resumo: receita.Resumo,
            descricao: receita.Descricao,
            imagem: receita.Imagem,
            criado: receita.Criado,
        }));
    }

   

}
