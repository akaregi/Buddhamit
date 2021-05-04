import { Command, Message } from 'discord.js'
import { die, fetchUserAll } from '../lib/Util'

const command: Command = {
    name: 'manpower',
    description: '人的をサーバー内から抽選します。',
    usage: 'manpower <role>',
    aliases: ['徴兵', '人的', 'mp'],

    async execute(ctx: Message, args: string[]) {
        if (ctx.channel.type === 'dm') {
            ctx.channel.send('あなたしかいませんよ、舎利子。')
            return
        }

        if (!args[0]) {
            return die(ctx, 'ロールを指定してください、舎利子よ。')
        }

        if (!args[0].startsWith('<@&') || !args[0].endsWith('>')) {
            return die(ctx, 'ロール指定がアラーです、舎利子。')
        }

        const role = args[0]?.slice(3).slice(0, -1)

        const members = (await fetchUserAll(ctx))
            ?.array()
            .filter(member => member.roles.cache.has(role))

        if (!members) {
            return die(ctx, 'そのロールに属する舎利子は存在しない。')
        }

        const candicate = members[Math.floor(Math.random() * members.length)]

        ctx.react('👍')
        ctx.channel.send(`${candicate} が徴兵対象です。`)
    }
}

export = command
