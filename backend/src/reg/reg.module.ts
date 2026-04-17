import { Module } from '@nestjs/common';
import { RegController } from './reg.controller';
import { RegService } from './reg.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';


@Module({
  imports:[PrismaModule,EncryptModule],
  controllers: [RegController],
  providers: [RegService]
})
export class RegModule {}
