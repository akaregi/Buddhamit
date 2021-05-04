import { Command, Message, MessageEmbed } from "discord.js"

const command: Command = {
    name: 'kraber',
    description: 'あなたはクレーバーです！',
    execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const images = [
            'https://cdn.discordapp.com/attachments/838232418434678828/838783297353154580/kraber1.jpg',
            'https://cdn.discordapp.com/attachments/838232418434678828/838783297064009792/kraber2.jpg',
            'https://cdn.discordapp.com/attachments/807605081260163112/838783855124152390/kraber3.jpg'
        ]

        const picked = images[Math.floor(Math.random() * images.length)] as string

        const embed = new MessageEmbed()
            .setAuthor('Titanfall, Titanfall 2, Apex Legends')
            .setTitle('クレーバー')
            .setDescription('圧倒的破壊力と劣悪な操作性を誇る、モンスター仕様の対物スナイパーライフル。')
            .setImage(picked)
            .addFields(
                { name: '名称', value: 'クレーバー.50スナイパー', inline: true},
                { name: 'Name', value: 'Kraber .50-cal Sniper', inline: true}
            )
            .setTimestamp()
            .setFooter('Titanfall, Titanfall 2, Apex Legends')

        ctx.reply(embed)
    }
}

export = command
