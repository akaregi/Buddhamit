import { Collection } from 'discord.js'
import { Command, Message, MessageEmbed } from 'discord.js'
import { convertId, die } from '../lib/Util'

const command: Command = {
    name: 'numbers',
    description: '1～10までの数字を当てよう！ numbers stats で戦績がわかる。',
    usage: 'numbers [stats]',
    aliases: ['number', 'num'],

    execute (ctx: Message, args: string[]) {
        if (args[0] && args[0] === 'stats') {
            ctx.react('👍')
            stats(ctx)
            return
        }

        if (args[0] && args[0] === 'log') {
            ctx.react('👍')
            log(ctx)
            return
        }

        const answer = Math.ceil(Math.random() * 10)
        const seconds = Math.ceil(Math.random() * 10)
        const filter = (response: string) => parseInt(response) === answer

        const startTime = new Date()

        ctx.react('👍')
        ctx.channel.send(`ブッダの求める数値を提示せよ……${seconds}秒内に！`)
        ctx.channel.awaitMessages(filter, { max: 1, time: seconds * 1000, errors: ['time'] })
            .then(async answers => {
                const endTime = new Date()
                const remaining = endTime.getTime() - startTime.getTime()

                win(ctx, answer, seconds, remaining, answers)

                await newRecord(
                    ctx, convertId(ctx.author.id), ctx.author.username, true, answer, seconds, remaining
                )
            })
            .catch(async () => {
                lose(ctx, answer)
                await newRecord(
                    ctx, convertId(ctx.author.id), ctx.author.username, false, answer, seconds, 0
                )
            })
    }
}

export = command

async function win (
    ctx: Message,
    answer: number,
    seconds: number,
    remaining: number,
    answers: Collection<string, Message>
) {
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
        `答えは「**${answer}**」、残り時間は「**${seconds - (remaining / 1000)}秒**」であった。` +
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

async function log (ctx: Message) {
    const prisma = ctx.client.prisma

    const data = await prisma.numbers_records.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 3
    })

    if (!data || data.length < 3) {
        return die(ctx, '十分な戦績データが集まっていない。')
    }

    const embeds: MessageEmbed[] = []

    for (const datum of data) {
        const embed = new MessageEmbed()
            .setAuthor(datum.user_name)
            .setTitle(`NUMBERS CHALLENGE #${datum.id}: ${datum.win ? '勝ち' : '負け'}`)
            .addFields(
                { name: '答え', value: `${datum.answer}`, inline: true },
                { name: '制限時間', value: `${datum.time_limit}秒`, inline: true },
                { name: '残り時間', value: `${datum.remaining_time / 1000}秒`, inline: true }
            )
            .setTimestamp(datum.date)
            .setFooter('BUDDHAMIT NUMBERS™ CHALLENGE')

        embeds.push(embed)
    }

    for (const embed of embeds) {
        ctx.reply(embed)
    }
}

async function newRecord (
    ctx: Message,
    user_id: number,
    user_name: string,
    win: boolean,
    answer: number,
    timeLimit: number,
    remaining: number
) {
    const table = ctx.client.prisma.numbers_records

    await table.create({
        data: {
            user_id: user_id,
            user_name: user_name,
            win: win,
            answer: answer,
            date: new Date(),
            time_limit: timeLimit,
            remaining_time: remaining
        }
    })
}
