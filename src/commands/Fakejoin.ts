import { Command, Message } from 'discord.js'
import { createReadStream } from 'fs'

const command: Command = {
    name: 'fakejoin',
    description: '0～15秒間ボイスチャンネルに接続して説教します。',
    aliases: ['fakebuddha', 'fake', 'ヤクザブッダ', '説教', 'フェイクブッダ'],

    async execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const channel = ctx.member?.voice.channel

        if (!channel) {
            ctx.reply('本堂にて悟りを待たれたし。')
            return
        }

        const long = args[0] && args[0] === '-a' ? true : false

        const connection = await channel.join()
        const dispatcher = connection.play(
            createReadStream(`music/${long ? 'sutra2.opus' : 'sutra.opus'}`),
            { type: 'ogg/opus' }
        )
        const seconds = long
            ? 18000
            : Math.ceil(Math.random() * 15000)

        dispatcher.on('start', () => ctx.reply(`${seconds / 1000}秒説教を行います……`))
        dispatcher.on('finish', () => channel.leave())
        dispatcher.on('error', console.error)

        setTimeout(() => {
            channel.leave()
        }, seconds )
    }
}

export = command
