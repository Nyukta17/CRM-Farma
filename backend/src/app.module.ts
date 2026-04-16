import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegModule } from './reg/reg.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Позволяет не импортировать его в каждый модуль отдельно
      envFilePath: '.env',
    }),
    PrismaModule,
    RegModule,
    AuthModule,
    EncryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
