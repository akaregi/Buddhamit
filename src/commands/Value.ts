import { Command, Message } from "discord.js"

const command: Command = {
    name: 'value',
    description: 'お前の価値を算出します。',
    aliases: ['俺の価値'],

    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(`お前の価値は${Math.ceil(Math.random() * 100)}/100だ。`)
    }
}

export = command
