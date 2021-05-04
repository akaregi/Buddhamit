import { Message } from "discord.js"

export function fetchUserAll (ctx: Message) {
    return ctx.guild?.members.fetch()
}

export function fetchUser(ctx: Message, id: string) {
    return ctx.guild?.members.fetch(id)
}

export function die(ctx: Message, message: string) {
    ctx.react('❌')
    ctx.reply(message)
}
