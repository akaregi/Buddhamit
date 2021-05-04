import { Prisma, PrismaClient } from "@prisma/client"
import { Logger } from "log4js"

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, Command>,
        prefix: string
        logger: Logger
        prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>
    }

    export interface Command {
        name: string,
        description: string,
        aliases?: string[],
        usage?: string,
        cooldown?: number;
        execute: (message: Message, args: string[]) => void
    }
}
