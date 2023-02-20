import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => ({});

seed()
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    console.log('Seeds have loaded');
    return process.exit();
  });
