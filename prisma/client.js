import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    transactionOptions: {
        timeout: 20000
    },
    log: [
    {
        emit: 'event',
        level: 'query',
    },
    {
        emit: 'event',
        level: 'error',
    },
    {
        emit: 'stdout',
        level: 'info',
    },
    {
        emit: 'stdout',
        level: 'warn',
    }
],
    errorFormat: 'pretty',
})

prisma.$on('error', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
})

export { prisma }
