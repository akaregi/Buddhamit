import { Collection } from 'discord.js'
import { Command, Message } from 'discord.js'
import { convertId } from '../lib/Util'

const command: Command = {
    name: 'numbers',
    description: '1～10までの数字を当てよう！ numbers stats で戦績がわかる。',
    usage: 'numbers [stats]',
    aliases: ['number', 'num'],


    execute(ctx: Message, args: string[]) {
        if (args[0] && args[0] === 'stats') {
            stats(ctx)
            return
        }

        const answer = Math.ceil(Math.random() * 10)
        const seconds = Math.ceil(Math.random() * 10)
        const filter = (response: string) => parseInt(response) === answer

        const startTime = new Date()

        ctx.react('👍')
        ctx.channel.send(`ブッダの求める数値を提示せよ……${seconds}秒内に！`)
        ctx.channel.awaitMessages(filter, { max: 1, time: seconds * 1000, errors: ['time'] })
            .then(answers => {
                win(ctx, answer, seconds, startTime, answers)
            })
            .catch(() => {
                lose(ctx, answer)
            })
    }
}

export = command

async function win (ctx: Message, answer: number, seconds: number, startTime: Date, answers: Collection<string, Message>, ) {
    const endTime = new Date()
    const spentTime = endTime.getTime() - startTime.getTime()

    const id = convertId(ctx.author.id)

    const prisma = ctx.client.prisma
    await prisma.numbers_stats.upsert({
        create: { user_id: id, win: 1 },
        update: { win: { increment: 1 } },
        where: { user_id: id }
    })

    ctx.react('⭕')
    ctx.channel.send(
        `:tada: :tada: ${answers.first()?.author} は天才です :tada: :tada:\n` +
        `答えは「**${answer}**」、残り時間は「**${seconds - (spentTime / 1000)}秒**」であった。` +
        '皆の衆、よく見習うべし。'
    )
}

async function lose (ctx: Message, answer: number) {
    const id = convertId(ctx.author.id)

    const prisma = ctx.client.prisma
    await prisma.numbers_stats.upsert({
        create: { user_id: id, lose: 1 },
        update: { lose: { increment: 1 } },
        where: { user_id: id}
    })

    ctx.react('❌')
    ctx.channel.send(`あなた達は皆甲斐性がない。答えは**${answer}**であった。`)
}

async function stats (ctx: Message) {
    const prisma = ctx.client.prisma

    const data = await prisma.numbers_stats.findFirst({
        where: {
            user_id: convertId(ctx.author.id)
        }
    })

    if (data) {
        ctx.reply(`あなたは「**${data.win}回**」勝利、「**${data.lose}回**」敗北。精進せよ。`)
        return
    }

    ctx.reply('あなたの戦績はまだ存在しない。')
}
