import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'jugemu',
    description: '寿限無を唱えます。',

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute (ctx: Message, args: string[]) {
        ctx.react('👍')
        ctx.reply(`
寿限無寿限無
五劫の擦り切れ
海砂利水魚の
水行末、雲来末、風来末
食う寝る処に住む処
薮ら柑子のぶら柑子
パイポ・パイポ・パイポのシューリンガン、
シューリンガンのグーリンダイ、
グーリンダイのポンポコピーのポンポコナの、
長久命の${ctx.author.username}！！！
        `)
    }
}

export = command
