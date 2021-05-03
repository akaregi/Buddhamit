import { Command, Message } from "discord.js"

const command: Command = {
    name: 'fakejoin',
    description: '1～10秒間ボイスチャンネルに接続して説教します。',

    async execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const channel = ctx.member?.voice.channel

        if (!channel) {
            ctx.reply('本堂にて悟りを待たれたし。')
            return
        }

        const seconds = Math.ceil(Math.random() * 9000) + 1000

        ctx.reply(`${seconds / 1000}秒説教を行います……`)

        await channel.join()
        setTimeout(() => {
            channel.leave()
        }, seconds )
    }
}

export = command
