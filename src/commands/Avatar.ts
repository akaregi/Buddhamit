import { Command, Message, MessageEmbed, User } from 'discord.js'
import { die, fetchUser } from '../lib/Util'

const command: Command = {
    name: 'avatar',
    description: 'アバターを表示します。',
    usage: 'avatar [user]',
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
    ctx.reply('ブッダは貴方の真実の姿を見通しました……')
    ctx.reply(embed(ctx.author))
}

async function otherAvatar (ctx: Message, target: string) {
    if (!target.startsWith('<@!') || !target.endsWith('>')) {
        return die(ctx, '対象の指定はメンションに依って行われたい。')
    }

    const id = target.slice(3).slice(0, -1)
    const member = await fetchUser(ctx, id)

    if (!member) {
        return die(ctx, 'そいつはボットか輪廻転生していない。')
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
