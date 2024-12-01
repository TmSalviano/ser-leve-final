import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("teste")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  root(): string {
    return "This is the controller root get function"
  }
}
