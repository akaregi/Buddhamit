import { Message } from 'discord.js'
import { die } from '../lib/Util'

export function dispatchCommand (ctx: Message): void {
    const client = ctx.client
    const logger = ctx.client.logger

    // Neither illegal prefix nor sent by bot
    if (!ctx.content.startsWith(client.prefix) || ctx.author.bot) {
        return
    }

    const args = ctx.content.slice(client.prefix.length).split(/ +/)
    const command = args.shift()?.toLowerCase()

    if (!command) {
        return die(ctx, '起こり得ない…… `CommandDispatch.ts` @あかれぎ')
    }

    // It logs.
    logger.debug(`${ctx.author.username} ${ctx.content}`)

    try {
        const target =
            client.commands.get(command) ??
            client.commands
                .find(cmd => (cmd.aliases && cmd.aliases.includes(command)) ?? false)

        // Checks if command exists. Exits when not exist.
        if (!target) {
            return die(ctx, 'あなたは何を言っていますか?')
        }

        target.execute(ctx, args)
    } catch (error) {
        logger.error(error)
        return die(ctx, 'ブッダでもどうしようもないことが起こりました。')
    }
}
