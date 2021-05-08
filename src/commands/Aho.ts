import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'aho',
    description: 'あなたがアホだということを認めます。',
    aliases: ['アホ', 'あほ'],
    usage: 'aho [username]',

    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(`ブッダは${args[0] ?? ctx.author.username}がアホということを認めます……`)
    }
}

export = command
