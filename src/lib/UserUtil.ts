import { Message } from "discord.js"

export function fetchUser (ctx: Message, id: string) {
    return ctx.guild?.members.fetch(id)
}
