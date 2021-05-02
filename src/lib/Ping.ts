import { Message } from "discord.js"

export function ping (ctx: Message) {
    ctx.react('👍')
    ctx.channel.send('仏説摩訶般若波羅蜜多心経……')
}
