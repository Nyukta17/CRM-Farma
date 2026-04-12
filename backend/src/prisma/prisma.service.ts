import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit{
    async onModuleDestroy() {
        await this.$connnect();
    }
    async onModuleInit() {
        await this.$disconect
    }
}
