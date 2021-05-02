import { Message } from "discord.js"

export function members (ctx: Message) {
    ctx.react('👍')
    ctx.channel.send(`${ctx.author}よ、氏子は${ctx.guild?.memberCount}人います。`)
}
