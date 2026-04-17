import { Injectable } from '@nestjs/common';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplyOrder } from '@prisma/client';

@Injectable()
export class SupplyOrderService {
    constructor(private readonly prisma: PrismaService) {}

    async createOrder(dto: CreateSupplyOrderDto):Promise<SupplyOrder> {
        return this.prisma.$transaction(async (tx) => {
            // 1. Создаем сам заказ и его позиции
            const order = await tx.supplyOrder.create({
                data: {
                    supplier: dto.supplier,
                    totalAmount: dto.totalAmount,
                    status: 'DELIVERED', // Допустим, мы сразу принимаем товар
                    items: {
                        create: dto.items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            priceAtOrder: item.priceAtOrder
                        }))
                    }
                },
                include: { items: true }
            });

            // 2. Обновляем склад для каждой позиции в заказе
            for (const item of order.items) {
                // Увеличиваем количество товара
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        count: { increment: item.quantity } // Атомарное увеличение
                    }
                });

                // Записываем это в историю склада (StockAction)
                await tx.stockAction.create({
                    data: {
                        type: 'INCOMING',
                        amount: item.quantity,
                        productId: item.productId
                    }
                });
            }

            return order;
        });
    }
}
