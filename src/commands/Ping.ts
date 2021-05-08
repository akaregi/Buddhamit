import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'ping',
    description: '仏説摩訶般若波羅蜜多心経……',
    usage: 'ping [-v]',

    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply('仏説摩訶般若波羅蜜多心経……')

        if (args[0] && args[0] === '-v') {
            ctx.channel.send(
                'デバッグ情報: \n' +
                `レイテンシは「**${Date.now() - ctx.createdTimestamp}ms**」。`
            )
        }
    }
}

export = command
