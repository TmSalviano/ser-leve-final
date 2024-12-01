import { Injectable } from '@nestjs/common';

@Injectable() //This is a service and you knowit because it is injectable
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
