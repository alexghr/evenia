import { PrismaClient } from "@prisma/client";

// use the module cache to cache an instance of the prisma client
let prismaClient: PrismaClient | undefined;

export default function getPrismaClient(): PrismaClient {
  if (!prismaClient) {
    return (prismaClient = new PrismaClient());
  }
  return prismaClient;
}
