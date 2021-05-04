import { Command, Message } from "discord.js"

const command: Command = {
    name: 'help',
    description: '助け舟を出します。',
    aliases: ['助けてブッダ', '南無三', '南無阿弥陀仏', 'くわばらくわばら'],

    async execute(ctx: Message, args: string[]) {
        let text = '以下のコマンドが使えます：'
        for (const cmd of ctx.client.commands) {
            const command = cmd[1]
            const alises = command.aliases
                ?.map(cmd => `\`${cmd}\``)
                .join(', ') ?? 'エイリアスなし'

            text += '\n' +
                `\`${ctx.client.prefix}${command.usage ?? command.name}\`` +
                ` (${alises})\n` +
                `${command.description}\n`
        }

        ctx.reply('DM に送信します……')
        ctx.react('👍');
        (await ctx.author.createDM()).send(text)
    }
}

export = command
