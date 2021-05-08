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

        const role = ctx.guild?.roles.cache
            .find(role => {
                const name = role.name.toLowerCase()
                const object = args[0]?.toLowerCase()

                return !name.indexOf(object ?? '')
            })

        if (!role) {
            ctx.client.logger.debug(args[0])
            return die(ctx, '舎利子よ、そのロールは存在しない。')
        }

        const roleMembers = (await fetchUserAll(ctx))
            ?.array()
            .filter(member => member.roles.cache.has(role.id))

        const members = roleMembers
            ?.filter(member => !member.voice.channel)

        if (!members) {
            return die(ctx, '徴兵できる舎利子は存在しない。')
        }

        const candicate = members[Math.floor(Math.random() * members.length)]

        if (!candicate) {
            return die(ctx, '徴兵できる舎利子は存在しない。')
        }

        ctx.react('👍')
        ctx.channel.send(
            `${(new Date()).getMonth() + 1}月度勤労抽選により「${candicate}」は「**${role.name}**」のために徴兵される。`
        )

        if (args[1] && args[1] === '-v') {
            // Role members
            const targetMembers = roleMembers
                ?.map(member => member.user.username)
                .join(', ')

            // Excluded due to VC connection
            const excludeMembers = roleMembers
                ?.filter(member => member.voice.channel !== null)
                .map(member => member.user.username)
                .join(', ')

            // Final candicates
            const includeMembers = members
                .map(member => member.user.username)
                .join(', ')

            ctx.channel.send(
                'デバッグ情報: \n' +
                `対象ロール \`@${role.name} (${role.id})\` \n` +
                `ロール持ち: ${targetMembers} \n` +
                `VC により除外: ${excludeMembers ?? 'なし'} \n` +
                `**候補**: ${includeMembers}`
            )

        }
    }
}

export = command
