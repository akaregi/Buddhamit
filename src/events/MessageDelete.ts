import { PartialMessage } from 'discord.js'
import { Message } from 'discord.js'

export function preventMessageDelete (ctx: Message | PartialMessage): void {
    const permission = process.env['MESSAGE_PROHIBIT']

    if (!permission) {
        return
    }

    if (!ctx.member?.roles.cache.has(permission)) {
        return
    }

    const author = ctx.author
    const content = ctx.content

    if (ctx.author?.bot) {
        ctx.channel.send(`${content}`)
        return
    }

    const time = new Date()
    const format =
        `${time.getFullYear()}/${time.getMonth()}/${time.getDay()} ` +
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`

    ctx.channel.send(
        `${author} (${author?.tag}) ${format}\n` +
        `> ${content}`
    )
}
