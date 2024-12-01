import { Controller, Get } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
    @Get() 
    async criar() {
        return 'criando um usuario';
    }
}
