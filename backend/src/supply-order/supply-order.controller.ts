import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyOrderService } from './supply-order.service';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { SupplyOrder } from '@prisma/client';

@Controller('supply-order')
export class SupplyOrderController {
  constructor(private readonly supplyOrderService: SupplyOrderService) {}

  @Post()
  create(@Body() createSupplyOrderDto: CreateSupplyOrderDto):Promise<SupplyOrder> {
    return this.supplyOrderService.createOrder(createSupplyOrderDto);
  }

}
