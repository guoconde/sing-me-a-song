import { prisma } from '../../src/database.js';

export async function prismaDisconnect() {
  await prisma.$disconnect();
}

export async function truncateTable() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}
