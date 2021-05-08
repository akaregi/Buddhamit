import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'repeat',
    description: '同じことを繰り返します！',
    usage: 'repeat <message>',

    execute (ctx: Message, args: string[]) {
        if (!args[0]) {
            ctx.react('❌')
            ctx.reply('色即是空、空即是色……')
            return
        }

        ctx.react('👍')
        ctx.reply(args.join(' '))
    }
}

export = command
