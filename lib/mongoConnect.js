// This approach is taken from https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@prisma/client'

const globalForPrisma = (typeof globalThis !== 'undefined' ? globalThis : {})

let prismaInstance

if (!globalForPrisma.prisma) {
  prismaInstance = new PrismaClient({
    log: ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance
  }
} else {
  prismaInstance = globalForPrisma.prisma
}

export const prisma = prismaInstance