import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import Usuario from './entities/usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { FollowRepository } from 'src/follow/follow.repository';

@Controller('/api/usuario')
export class UsuarioController {
    constructor(private repo: UsuarioRepository, private followRepo: FollowRepository) {}

    //CRUD endpoints
    @Post() 
    async create(@Body() usuario: Usuario) { //@Body() takes the parameter: usuario from the body of the post request
        const novoUsuario = await this.repo.criar(usuario); //usuing the usuario.repository injectable
        return novoUsuario;
    }
    @Get()
    async getAll() {
        return await this.repo.findAll();
    }
    @Get(':id') //usuario/id
    async getId(@Param('id') id: string) { //the id parameter comes from the url conntroller/id <- so it comes as a string
        return await this.repo.findOne(+id); //turns the string into a number   
    }
    @Delete(":id")
    async deleteId(@Param('id') id: string) {
        return await this.repo.delete(+id);
    }
    @Patch(':id')
    async updateId(@Param('id') id: string, @Body() usuario: Usuario) {
        const updatedUser = await this.repo.update({
            ...usuario,
            Id: +id,
        });
        return updatedUser;
    }

    // Auth Endpoints
    @Post('/auth/reg')
    async register( @Body() body: { Email: string; Password: string; NameTag: string } ) {
        const { Email, Password, NameTag } = body;

        const usuario: Usuario = {
        NameTag,  
        Email,    
        Password, 
        Nome: null, 
        ProfilePicture: null, 
        Biografy: null, 
        Following: null, 
        };

        const novoUsuario = await this.repo.criar(usuario);
        return novoUsuario;
    }
    @Get('/auth/logout/:id')
    async logOut(@Param('id') Id: string) {
        return this.repo.logOut(+Id);
    }
    @Post('/auth/login')
    @HttpCode(HttpStatus.OK) 
    async logIn(@Body() body: { Email: string; Password: string}) {
        const { Email, Password } = body;

        const success = await this.repo.logIn(Email, Password);

        return success
    }

    //LoggedIn User Enpoints
    @Get('/loggedIn/:id')
    async getLoggedIn(@Param('id') Id: string, ) {
        return this.repo.getLoggedIn(+Id);
    }

    //Update LoggedInUser endpoints
    @Post('/editProfile/:id')
    async editProfile(
      @Param('id') Id: string,  @Body() body: { Nome: string; NameTag: string; ProfilePicture: string; Biografy: string; DarkMode: boolean; }
    ) {
      const { Nome, NameTag, ProfilePicture, Biografy, DarkMode } = body;
      // Convert the Id to a number, as it's typically a number in your database
      return this.repo.editProfile(+Id, Nome, NameTag, ProfilePicture, Biografy, DarkMode);
    }

    //Query For Users in Quem Seguir (Aside component)
    @Get('/QuemSeguir/:loggedInId')
    async get5Random(@Param('loggedInId') Id: string, @Query('queryString') queryString: string = "") : Promise<Usuario[]>  {
        console.log(queryString)
        return this.repo.get5RandomUsers(+Id, queryString)
    }


}
