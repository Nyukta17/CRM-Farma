
// @ts-ignore
import pkg from '@prisma/client';
// @ts-ignore
const prisma = new (pkg.PrismaClient || pkg.default.PrismaClient)();


async function main() {

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

  console.log('Роли успешно созданы');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
