import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: any;
  res: any;
  payload?: { userId: string };
}

export function createContext(req, res): Context {
  return {
    prisma,
    req,
    res,
  };
}
