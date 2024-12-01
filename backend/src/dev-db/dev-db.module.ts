import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//this module is to interact with prisma services
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //Makes the service visible to other modules
})
export class DevDbModule {}
