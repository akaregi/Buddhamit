import { Command, Message } from 'discord.js'
import { createReadStream, readdirSync } from 'fs'
import { die } from '../lib/Util'

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

        const files = readdirSync('./music')
            .filter(file => file.startsWith('allahu') && file.endsWith('.opus'))

        if (files.length === 0) {
            return die(ctx, 'アラー音源が一つもない。')
        }

        // NOTE: must be string
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const music = files[Math.floor(Math.random() * files.length)]!

        const connection = await channel.join()
        const dispatcher = connection.play(createReadStream(`music/${music}`), { type: 'ogg/opus' })

        dispatcher.on('start', () => ctx.reply('**ALLAHU AKBAR**'))
        dispatcher.on('finish', () => channel.leave())
        dispatcher.on('error', console.error)
    }
}

export = command
