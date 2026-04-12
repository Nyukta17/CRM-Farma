import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegModule } from './reg/reg.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AuthModule, RegModule, EncryptModule, PrismaModule],
})
export class AppModule {}
