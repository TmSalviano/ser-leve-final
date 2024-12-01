import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dev-db/prisma.service';
import Usuario from './entities/usuario.entity';

//This is a provider
//A provider is anything that can be injected into acontroller that is not a service
@Injectable() //Everything that has this annotation can be injected into the controller
export class UsuarioRepository {
    //PrismaService is accesible because usuario depends on dev-db module and PrismaService is visible/exported from db-dev module
    constructor(private prismaService: PrismaService) {

    }

    async findAll() {
        return this.prismaService.usuario.findMany(); //goes to prismaService in db-dev module then goes to usuario schema and call prisma methods in that schema
    }

    async findOne(id: number){
        return this.prismaService.usuario.findUnique({
            where: {
                Id: id,
            }
        });
    }

    async criar(usuario: Usuario) {
        return this.prismaService.usuario.create({
            data: usuario as any,
        })
    }

    async update(usuario: Usuario) {
        if (!usuario.Id) throw new Error("Usuario sem id");
        return this.prismaService.usuario.update({
            where: {
                Id: usuario.Id,
            },
            data: usuario as any,
        })
    }

    async delete(id: number) {
        return this.prismaService.usuario.delete({
            where: {
                Id: id,
            }
        })
    }
}
