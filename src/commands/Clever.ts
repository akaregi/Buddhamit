import { Command, Message } from "discord.js"

const command: Command = {
    name: 'clever',
    description: 'あなたは天才です！',
    aliases: ['クレバー'],

    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(` :tada: :tada: あなたは天才です :tada: :tada:`)
    }
}

export = command
