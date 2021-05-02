import { Message, MessageEmbed } from "discord.js"

export function avatar (ctx: Message) {
    ctx.react('👍')
    ctx.channel.send(`${ctx.author}よ、ブッダは貴方の真実の姿を見通しました……`)
    ctx.channel.send(
        new MessageEmbed()
            .setAuthor(ctx.author.username)
            .setImage(ctx.author.displayAvatarURL({
                size: 4096
            }))
            .setTimestamp(new Date())
    )
}
