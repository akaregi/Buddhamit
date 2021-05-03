import { Command, Message } from "discord.js"

const command: Command = {
    name: 'aho',
    description: 'あなたがアホだということを認めます。',
    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(`仏陀は${ctx.author.username}がアホということを認めます……`)
    }
}

export = command
