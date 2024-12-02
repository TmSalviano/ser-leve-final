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
            return { message: 'User not found or not logged in' };
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

    async editProfile(Id: number, Nome: string, NameTag: string, ProfilePicture: string, Biografy: string, DarkMode: boolean) {
        try {
            const user = await this.prismaService.usuario.findFirstOrThrow({
                where: {
                    Id,
                    IsLoggedIn: true,
                }
            }); //this is just to check if the user is logged in

            const updatedUser = await this.prismaService.usuario.update({
                where: {
                  Id,
                },
                data: {
                  Nome,
                  NameTag,
                  ProfilePicture,
                  Biografy,
                  DarkMode, // You can store DarkMode as a boolean or string, depending on your DB schema
                },
              });

        } catch (error) {
            console.error('Error fetching logged-in user:', error); 
            return { message: 'User not found or not logged in' };
        }

    }


    //Aside Component Functions
    async get5RandomUsers(loggedInUserId: number, queryString: string): Promise<Usuario[]> {
        try {
          // Base where clause to exclude the logged-in user
          const whereClause: any = {
            Id: { not: loggedInUserId }, // Exclude the logged-in user
          };
      
          if (queryString.trim()) {
            // Trim the queryString for any excess spaces and convert it to lowercase
            const query = queryString.trim().toLowerCase(); 
      
            // Add filtering conditions for each field with lowercase comparisons
            whereClause.OR = [
              { Nome: { contains: query.toLowerCase() } },  // Match Name
              { NameTag: { contains: query.toLowerCase() } }, // Match NameTag
              { Email: { contains: query.toLowerCase() } }    // Match Email
            ];
          }
      
          // Fetch the matching users based on the built where clause
          const users = await this.prismaService.usuario.findMany({
            where: whereClause,
          });
      
          // If no users are found, return an empty array
          if (users.length === 0) {
            return [];
          }
      
          // If exactly one user is found, return that user immediately
          if (users.length === 1) {
            return users;
          }
      
          // Shuffle the array and select up to 5 random users
          const shuffledUsers = users.sort(() => 0.5 - Math.random());
          const randomUsers = shuffledUsers.slice(0, 5);
      
          return randomUsers;
        } catch (error) {
          console.error('Error fetching random users:', error);
          return [];
        }
      }
      
      
      
      async getProfilePicture(usuarioId: number) {
        try {
            const usuario = await this.prismaService.usuario.findFirst({
                where: { Id: usuarioId },
                select: { ProfilePicture: true }, // Only select the ProfilePicture field
            });
    
            if (!usuario) {
                return { success: false, message: 'User not found' };
            }
    
            return { success: true, profilePicture: usuario.ProfilePicture };
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            return { success: false, message: 'Error fetching profile picture' };
        }
    }
      
      
      
}
