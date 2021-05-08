import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'disconnect',
    description: 'VCから強制切断させます。',

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const channel = ctx.member?.voice.channel

        if (channel && channel.members.has(ctx.client.user?.id ?? '')) {
            channel.leave()
            return
        }

        ctx.reply('ブッダは接続していない。')
    }
}

export = command
