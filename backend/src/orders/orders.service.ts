import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


// Используем Prisma.OrderDefaultArgs — он содержит только блоки include/select
const orderWithItemsArgs = {
  include: { items: true }
} satisfies Prisma.OrderDefaultArgs;

// Генерируем тип
export type OrderWithItems = Prisma.OrderGetPayload<typeof orderWithItemsArgs>;


@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrder(dto: CreateOrderDto): Promise<Order> {

    return this.prisma.$transaction(async (tx) => {
      for (const item of dto.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });
        if (!product || product.count < item.quantity) {
          throw new BadRequestException(
            `Недостаточно товара: ${product?.name || 'ID ' + item.productId}`
          )
        }
      }
      const order = await tx.order.create({
        data: {
          clientName: dto.clientName,
          totalPrice: dto.totalPrice,
          items: {
            create: dto.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        ...orderWithItemsArgs
      });

      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            count: { decrement: item.quantity } // Уменьшаем остаток
          }
        });
        await tx.stockAction.create({
          data: {
            type: "OUTGOING",
            amount: item.quantity,
            productId: item.productId
          }
        })
      }
      return order
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
