import { Command, Message } from "discord.js"

const command: Command = {
    name: '',
    description: '',
    aliases: [''],

    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
    }
}

// export = command
