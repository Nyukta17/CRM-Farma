import { Module } from '@nestjs/common';
import { RegController } from './reg.controller';
import { RegService } from './reg.service';
import { EncryptController } from 'src/encrypt/encrypt.controller';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EncryptModule } from 'src/encrypt/encrypt.module';


@Module({
  imports:[PrismaModule,EncryptModule],
  controllers: [RegController,EncryptController],
  providers: [RegService,EncryptService]
})
export class RegModule {}
