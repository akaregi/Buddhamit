import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'value',
    description: 'お前の価値を算出します。',
    usage: 'value [name]',
    aliases: ['俺の価値'],

    execute (ctx: Message, args: string[]) {
        const name = args[0] ? `「${args[0]}」` : 'お前'

        ctx.react('👍')
        ctx.reply(`${name}の価値は「**${Math.ceil(Math.random() * 100)}/100**」だ。`)
    }
}

export = command
