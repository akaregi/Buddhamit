import { Logger } from "log4js"

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, Command>,
        logger: Logger
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
