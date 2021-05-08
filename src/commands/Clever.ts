import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'clever',
    description: 'あなたは天才です！',
    usage: 'clever [username]',
    aliases: ['クレバー', '天才'],

    execute (ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(` :tada: :tada: ${args[0] ?? 'あなた'}は天才です :tada: :tada:`)
    }
}

export = command
