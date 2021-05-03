import { Command, Message } from "discord.js"

const command: Command = {
    name: 'ping',
    description: '仏説します。',
    execute (ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply('仏説摩訶般若波羅蜜多心経……')
    }
}

export = command
