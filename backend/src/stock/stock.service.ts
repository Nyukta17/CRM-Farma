import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';


@Injectable()
export class StockService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create(createStockDto: CreateStockDto):Promise<Product> {
    return this.prismaService.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: createStockDto.name,
          price: createStockDto.price,
          count: createStockDto.count,
          group: createStockDto.group
        }
      })
      await tx.stockAction.create({
        data:{
          type: 'INCOMING',
          amount: createStockDto.count,
          productId: product.id
        }
      });
      return product
    });

  }

  async findAll():Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { history: true }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  async update(id: number, updateStockDto: UpdateStockDto):Promise<Product> {
    return this.prismaService.product.update({
      where:{id},
      data:updateStockDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
