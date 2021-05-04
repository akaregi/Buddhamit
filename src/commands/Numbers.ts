import { Command, Message } from "discord.js"

const command: Command = {
    name: 'numbers',
    description: '数値当てゲーム 1～10',
    aliases: ['number', 'num'],

    execute(ctx: Message, args: string[]) {
        const answer = Math.ceil(Math.random() * 10)
        const seconds = Math.ceil(Math.random() * 10)
        const filter = (response: string) => parseInt(response) === answer

        const startTime = new Date()

        ctx.react('👍')
        ctx.channel.send(`ブッダの求める数値を提示せよ……${seconds}秒内に！`)
        ctx.channel.awaitMessages(filter, { max: 1, time: seconds * 1000, errors: ['time'] })
            .then(answers => {
                const endTime = new Date()
                const spentTime = endTime.getTime() - startTime.getTime()

                ctx.react('⭕')
                ctx.channel.send(`
:tada: :tada: ${answers.first()?.author} は天才です :tada: :tada:

答えは「**${answer}**」、残り時間は「**${seconds - (spentTime / 1000)}秒**」であった。
皆の衆、よく見習うべし。
                `)
            })
            .catch(_ => {
                ctx.react('❌')
                ctx.channel.send(`あなた達は皆甲斐性がない。答えは**${answer}**であった。`)
            })
    }
}

export = command
