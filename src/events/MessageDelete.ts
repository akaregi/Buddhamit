import { PartialMessage } from "discord.js"
import { Message } from "discord.js"

export function preventMessageDelete (ctx: Message | PartialMessage) {
    const permission = process.env['MESSAGE_PROHIBIT']

    if (!permission) {
        return
    }

    if (!ctx.member?.roles.cache.has(permission)) {
        return
    }

    const author = ctx.author?.tag
    const content = ctx.content

    if (ctx.author?.bot) {
        ctx.channel.send(`${content}`)
        return
    }

    ctx.channel.send(`${author} ${content}`)
}
