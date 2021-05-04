import { Command, Message, MessageEmbed } from 'discord.js'

const command: Command = {
    name: 'kerber',
    description: 'あなたはケルベルです！',

    // NOTE: args must be implemented by discord.d.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(ctx: Message, args: string[]) {
        ctx.react('👍')

        const embed = new MessageEmbed()
            .setAuthor('Kerber / Кербер', 'http://www.kerber.rs/wp-content/uploads/2019/03/1986_-_Seobe.jpg', 'http://www.kerber.rs/home/')
            .setTitle('Hajde da se volimo')
            .setURL('https://www.youtube.com/watch?v=LLZRSB7SK2U')
            .setDescription('Пусти то, хајде да се волимо')
            .addFields(
                { name: 'Назив', value: 'Хајде да се волимо', inline: true },
                { name: 'Албум', value: 'Сеобе (ПГП РТБ)', inline: true },
                { name: 'Издат', value: '1986.', inline: true },
            )
            .setTimestamp()

        ctx.reply(embed)
    }
}

export = command
