import { Command, Message, MessageEmbed, User } from "discord.js"
import { fetchUser } from "../lib/UserUtil"

const command: Command = {
    name: 'avatar',
    description: '',
    execute: (ctx: Message, args: string[]) => {
        if (args[0]) {
            otherAvatar(ctx, args[0])
            return
        }

        selfAvatar(ctx)
    }
}

export = command

function selfAvatar (ctx: Message) {
    ctx.reply(`ブッダは貴方の真実の姿を見通しました……`)
    ctx.reply(embed(ctx.author))
}

async function otherAvatar (ctx: Message, target: string) {
    if (!target.startsWith("<@!") || !target.endsWith(">")) {
        ctx.reply('対象の指定はメンションに依って行われたい。')
        return
    }

    const id = target.slice(3).slice(0, -1)
    const member = await fetchUser(ctx, id)

    if (!member) {
        ctx.reply('そいつはボットか輪廻転生していない。')
        return
    }

    ctx.reply(`ブッダは ${member.user.username} の真実の姿を見通しました……`)
    ctx.reply(embed(member.user))
}

function embed (author: User) {
    return new MessageEmbed()
        .setAuthor(author.username)
        .setImage(author.displayAvatarURL({
            size: 4096
        }))
        .setTimestamp(new Date())
}
