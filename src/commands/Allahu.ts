import { Command, Message } from 'discord.js'
import { createReadStream, existsSync } from 'fs'

const command: Command = {
    name: 'allahu',
    description: 'ｱｯﾗｰｱｸﾊﾞｰ！',
    aliases: ['ヤクザアラー'],

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const channel = ctx.member?.voice.channel

        if (!channel) {
            ctx.reply('あなたはアラーです。')
            return
        }

        if (!existsSync('music/allahu1.opus') && !existsSync('music/allahu2.opus')) {
            ctx.reply('このブッダには伝統的アラーが搭載されていない。')
            return
        }

        const musics = ['music/allahu1.opus', 'music/allahu2.opus']
        // NOTE: must be string
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const music = musics[Math.floor(Math.random() * musics.length)]!

        const connection = await channel.join()
        const dispatcher = connection.play(createReadStream(music), { type: 'ogg/opus' })

        dispatcher.on('start', () => ctx.reply('**ALLAHU AKBAR**'))
        dispatcher.on('finish', () => channel.leave())
        dispatcher.on('error', console.error)
    }
}

export = command
