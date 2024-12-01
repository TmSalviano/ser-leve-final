import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//1. use: nest --help for scaffolding options an 
//2. then nest g (generate) what-you-want-to-scaffold scaffold-name
//  2.1 helpful flags
      //2.1.1 --flat -> dont create a new folder
      //2.1.2 --no-spec -> dont create the test files

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Only allow requests from this origin
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
