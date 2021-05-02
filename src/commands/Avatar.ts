import { GuildMember, Message, MessageEmbed } from "discord.js"

export function avatar (ctx: Message) {
    const args = ctx.content.split(' ')

    if (args.length >= 2 && args[1]) {
        otherAvatar(ctx, args[1]); return
    }

    selfAvatar(ctx)
}

function selfAvatar (ctx: Message) {
    ctx.channel.send(`${ctx.author}よ、ブッダは貴方の真実の姿を見通しました……`)
    ctx.channel.send(
        new MessageEmbed()
            .setAuthor(ctx.author.username)
            .setImage(ctx.author.displayAvatarURL({
                size: 4096
            }))
            .setTimestamp(new Date())
    )
}

async function otherAvatar (ctx: Message, target: string) {
    const id = target.slice(3).slice(0, -1)
    const member = await fetchUser(ctx, id)

    if (!member) {
        ctx.channel.send(`${ctx.author}よ、悪いんだけどもう一回やってくれ（仕様上）`)
        return
    }

    ctx.channel.send(`${ctx.author}よ、ブッダは ${member?.user.username} の真実の姿を見通しました……`)
    ctx.channel.send(
        new MessageEmbed()
            .setAuthor(member.user.username)
            .setImage(member.user.displayAvatarURL({
                size: 4096
            }))
            .setTimestamp(new Date())
    )
}

async function fetchUser (ctx: Message, id: string): Promise<GuildMember | undefined> {
    try {
        return await ctx.guild?.members.fetch(id)!!
    } catch (error) {
        return undefined
    }
}
