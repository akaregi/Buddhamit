import { Message } from 'discord.js'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetchUserAll (ctx: Message) {
    return ctx.guild?.members.fetch()
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fetchUser (ctx: Message, id: string) {
    return ctx.guild?.members.fetch(id)
}

export function convertId (id: string): number {
    return parseInt(id.slice(3).slice(0, -1)) ?? 0
}

export function die (ctx: Message, message: string): void {
    ctx.react('❌')
    ctx.reply(message)
}
