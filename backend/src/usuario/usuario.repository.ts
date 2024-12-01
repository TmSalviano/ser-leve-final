import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/dev-db/prisma.service';
import Usuario from './entities/usuario.entity';
import { ok } from 'assert';

//This is a provider
//A provider is anything that can be injected into acontroller that is not a service
@Injectable() //Everything that has this annotation can be injected into the controller
export class UsuarioRepository {
    //PrismaService is accesible because usuario depends on dev-db module and PrismaService is visible/exported from db-dev module
    constructor(private prismaService: PrismaService) {}


    //These are some default CRUD operations
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

// Logged User Functions
    async getLoggedIn(Id: number) {
        try {
            return await this.prismaService.usuario.findFirstOrThrow({
                where: {
                    Id,
                    IsLoggedIn: true,
                }
            });
        } catch (error) {
            console.error('Error fetching logged-in user:', error); 
            return { error: 'User not found or not logged in' };
        }
    }
    
    async logIn(Email: string, Password: string, ) {
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                Email,
            }
        })

        if (!usuario) {
            return { success: false, loggedinUser: null,  message: 'User Not Found'};
        }

        if (usuario.Password == Password) {
            await this.prismaService.usuario.update({
                where: { Id: usuario.Id },
                data: {
                    IsLoggedIn: true,  
                }
            });

            return {success: true, loggedInUser: usuario}
        } 
        return { success: false, loggedInUser: null,  message: 'Incorrect Password'}
    }
    
    async logOut(Id: number) {
        try {
            const loggedInUser = await this.prismaService.usuario.findFirstOrThrow({
                where: {
                    Id,
                    IsLoggedIn: true,  
                }
            });
    
            const updatedUser = await this.prismaService.usuario.update({
                where: { Id: loggedInUser.Id },
                data: {
                    IsLoggedIn: false,  
                }
            });
    
            return { success: true, message: 'User logged out successfully', user: updatedUser };
        } catch (error) {
            return { success: false,  message: 'User not found or already logged out' };
        }
    }


    async register(usuario: Usuario) {
        return this.prismaService.usuario.create({
            data: usuario as any,
        })
    }

}
