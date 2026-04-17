import { Module } from '@nestjs/common';
import { SupplyOrderService } from './supply-order.service';
import { SupplyOrderController } from './supply-order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SupplyOrderController],
  providers: [SupplyOrderService],
})
export class SupplyOrderModule {}
