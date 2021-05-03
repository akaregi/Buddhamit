import { Command, Message, VoiceConnection } from "discord.js"
import ytdl from 'ytdl-core-discord'

const command: Command = {
    name: 'yt',
    description: '',
    async execute(ctx: Message, args: string[]) {
        const channel = ctx.member?.voice.channel

        if (!channel) {
            ctx.reply('本堂にて悟りを待たれたし。')
            return
        }

        const connection = await channel.join()

        ctx.reply('ok')

        channel.leave()

        ctx.react('👍')
    }
}

async function play (connection: VoiceConnection, url: string) {
    const dispatcher = connection.play(await ytdl(url), { type: "opus" })

    dispatcher.once('finish', () => {
        connection.channel.leave()
    })
}

export = command
