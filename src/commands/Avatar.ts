import { Message, MessageEmbed, User } from "discord.js"
import { fetchUser } from "../lib/UserUtil"

export function avatar (ctx: Message, args: string[]) {
    if (args[0]) {
        otherAvatar(ctx, args[0])
        return
    }

    selfAvatar(ctx)
}

function selfAvatar (ctx: Message) {
    ctx.channel.send(`${ctx.author}よ、ブッダは貴方の真実の姿を見通しました……`)
    ctx.channel.send(embed(ctx.author))
}

async function otherAvatar (ctx: Message, target: string) {
    if (!target.startsWith("<@!") || !target.endsWith(">")) {
        ctx.channel.send(`${ctx.author}よ、対象の指定はメンションに依って行われたい。`)
        return
    }

    const id = target.slice(3).slice(0, -1)
    const member = await fetchUser(ctx, id)

    if (!member) {
        ctx.channel.send(`${ctx.author}よ、そいつはボットか輪廻転生していない。`)
        return
    }

    ctx.channel.send(`${ctx.author}よ、ブッダは ${member.user.username} の真実の姿を見通しました……`)
    ctx.channel.send(embed(member.user))
}

function embed (author: User) {
    return new MessageEmbed()
        .setAuthor(author.username)
        .setImage(author.displayAvatarURL({
            size: 4096
        }))
        .setTimestamp(new Date())
}
