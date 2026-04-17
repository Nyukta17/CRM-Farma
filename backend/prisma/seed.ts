import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Начало процесса посева (seeding)...');

  // 1. Очистка существующих данных (в обратном порядке связей)
  // Это гарантирует, что каждый запуск сида создает чистую базу
  await prisma.stockAction.deleteMany();
  await prisma.product.deleteMany();
  // Роли обычно не удаляем, если они используются в других местах, 
  // но для чистоты можно оставить upsert

  // 2. Создание или обновление ролей (upsert)
  const adminRole = await prisma.role.upsert({
    where: { id: 1 }, // Предполагаем, что ID 1 — это админ
    update: {},
    create: { id: 1, role: 'ADMIN' },
  });

  const clientRole = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, role: 'CLIENT' },
  });

  console.log('Роли проверены/созданы');

  // 3. Данные для товаров
  const productsData = [
    { name: 'Парацетамол', price: 5000, count: 12, group: 'Анилины' },
    { name: 'Ибупрофен', price: 7500, count: 20, group: 'НПВС' },
    { name: 'Аспирин', price: 3000, count: 50, group: 'Салицилаты' },
    { name: 'Анальгин', price: 4500, count: 5, group: 'Анилины' },
  ];

  // 4. Цикл создания товаров с историей
  for (const item of productsData) {
    await prisma.product.create({
      data: {
        name: item.name,
        price: item.price,
        count: item.count,
        group: item.group,
        // Связанное создание записи в истории
        history: {
          create: {
            type: 'INCOMING',
            amount: item.count,
          },
        },
      },
    });
  }

  console.log(`Посев завершен: добавлено ${productsData.length} товаров.`);
}



main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
