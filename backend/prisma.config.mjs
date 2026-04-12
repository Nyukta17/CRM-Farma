import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
   migrations: {
    seed: 'tsx prisma/seed.ts', 
  },
  datasource: {
    // Используется для миграций (прямое соединение)
    url: process.env.DIRECT_URL,
  },
  // В Prisma 7 настройки клиента лежат здесь
  runtime: {
    // Сюда передаем твою строку prisma+postgres://
    url: process.env.DATABASE_URL,
  },
});
