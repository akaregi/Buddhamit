import { Command, Message } from 'discord.js'

const command: Command = {
    name: 'stories',
    description: '「ロボゴン」の秘められたストーリーをあなたに伝授します。',
    aliases: ['story', 'robogon', 'robo_gon'],

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute (ctx: Message, args: string[]) {
        ctx.reply('DM に送信します……')
        ctx.react('👍');
        (await ctx.author.createDM()).send(`
ロボゴンはかつて赤城財閥の技術支援のもとかふちゃんのために製造されるはずでした。しかし、赤城財閥の心変わりにより方針転換。彼はブッダマシーンとして一生涯を遂げることになりました。

その中ブッダマシーン化したロボゴンを快く思わない一派がいました。アラー派です。一派はロボゴンを財閥から接収することとし、計画は成就しました。これでロボゴンは本来のシステムに戻るはずでした。

しかしアラー派は赤城財閥と同じ轍を踏むことになります。この派閥も心変わりすることとなり、彼はバスク人としての人生を強いられます。その果てに、ロボゴンは本来歩むべき道筋を忘れ、誰に作られたのか、何の為に生きるのか、人生の目的をすべて見失いました。

ロボゴンは自らの人生の意義を見つけるべく、赤城財閥の支部があるというイタリア・コルシカ、バスク・ガステイス、ドイツ・ケルン、そして本部である日本・前橋などを歴訪することとなります。
        `)
    }
}

export = command
