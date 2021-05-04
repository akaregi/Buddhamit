import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'aho',
    description: 'あなたがアホだということを認めます。',

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(`仏陀は${ctx.author.username}がアホということを認めます……`)
    }
}

export = command
