import { Prisma } from '@prisma/client';

export function PrismaMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    const duration = after - before;

    console.log(`Prisma Query:`);
    console.log(`  - Model: ${params.model}`);
    console.log(`  - Action: ${params.action}`);
    console.log(`  - Duration: ${duration}ms`);
    console.log(`-----------------------------`);

    return result;
  };
}
