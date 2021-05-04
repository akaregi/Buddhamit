declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, Command>
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
