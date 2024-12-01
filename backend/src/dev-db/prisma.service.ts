import { Global, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


//This is a copy from nestjs and prisma page of the nestjs website
@Global() //instantiate the service only once regardless of where you instantiate it
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
      await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
