import { Command, Message } from "discord.js"

const command: Command = {
    name: 'members',
    description: '氏子の人数を出します。',
    execute (ctx: Message, args: string[]) {
        if (ctx.channel.type === 'dm') {
            ctx.reply('氏子はあなたしかいません。')
            return
        }

        ctx.react('👍')
        ctx.reply(`氏子は${ctx.guild?.memberCount}人います。`)
    }
}

export = command
