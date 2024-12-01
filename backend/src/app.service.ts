import { Injectable } from '@nestjs/common';
//Injectable means that this is a depency injection (injected through the constructor)
@Injectable() //This is a service and you knowit because it is injectable
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
