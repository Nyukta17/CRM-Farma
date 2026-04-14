import "dotenv/config"; 
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  // upsert предотвратит ошибки при повторном запуске
  await prisma.role.upsert({
    where: { role: 'admin' },
    update: {},
    create: { role: 'admin' },
  });

  await prisma.role.upsert({
    where: { role: 'client' },
    update: {},
    create: { role: 'client' },
  });

  console.log('✅ Роли успешно проинициализированы');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
