import { Command, Message } from 'discord.js'

const command: Command = {
    name: '',
    description: '',
    aliases: [''],

    execute (ctx: Message, args: string[]) {
        if (args[0] && args[0] === 'data') {
            // Arguments processor
        }

        ctx.react('👍')
    }
}

export = command
