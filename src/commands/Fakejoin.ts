import { Command, Message } from "discord.js"
import { createReadStream, existsSync } from "fs"

const command: Command = {
    name: 'fakejoin',
    description: '0～15秒間ボイスチャンネルに接続して説教します。',
    aliases: ['fakebuddha', 'fake', 'join', 'ヤクザブッダ'],

    async execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const channel = ctx.member?.voice.channel

        if (!channel) {
            ctx.reply('本堂にて悟りを待たれたし。')
            return
        }

        if (!existsSync('music/sutra.opus')) {
            ctx.reply('このブッダには般若心経が搭載されていない。')
            return
        }

        const connection = await channel.join()
        const dispatcher = connection.play(createReadStream('music/sutra.opus'), { type: "ogg/opus" })
        const seconds = Math.ceil(Math.random() * 15000)

        dispatcher.on('start', () => ctx.reply(`${seconds / 1000}秒説教を行います……`))
        dispatcher.on('finish', () => channel.leave())
        dispatcher.on('error', console.error);

        setTimeout(() => {
            channel.leave()
        }, seconds )
    }
}

export = command
