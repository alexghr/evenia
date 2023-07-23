import { PrismaClient } from "@prisma/client";

// use the module cache to cache an instance of the prisma client
const prismaClient = new PrismaClient();

export default prismaClient;
