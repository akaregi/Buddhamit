import { Command, Message } from "discord.js"

const command: Command = {
    name: 'numbers',
    description: '数値当てゲーム 1～10',
    aliases: ['number', 'num'],

    execute(ctx: Message, args: string[]) {
        const answer = Math.ceil(Math.random() * 10)
        const seconds = Math.ceil(Math.random() * 10)
        const filter = (response: string) => parseInt(response) === answer

        ctx.react('👍')
        ctx.channel.send(`ブッダの求める数値を提示せよ……${seconds}秒内に！`)
        ctx.channel.awaitMessages(filter, { max: 1, time: seconds * 1000, errors: ['time'] })
            .then(answers => {
                ctx.channel.send(`:tada: :tada: ${answers.first()?.author} は天才です :tada: :tada:`)
                ctx.channel.send(`答えは**${answer}**であった。皆の衆、よく見習うべし。`)
            })
            .catch(_ => {
                ctx.channel.send(`あなた達は皆甲斐性がない。答えは**${answer}**であった。`)
            })
    }
}

export = command
