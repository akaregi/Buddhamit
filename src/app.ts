import { Client as DiscordJS } from 'discord.js'

// Command libraries
import { ping } from './lib/Ping'
import { stories } from './lib/Stories'
import { avatar } from './lib/Avatar'
import { members } from './lib/Members'

require('dotenv').config()

// Discord Bot
const client = new DiscordJS()

const TOKEN = process.env['TOKEN'] || "aaa"
const PREFIX = process.env['PREFIX'] || "-"

console.log('Booting BUDDHAMIT Bot...')
console.log(`Logging in as ${client.user?.tag || 'unknown'}`)

client.on('ready', () => {
    console.log('Booted BUDDHAMIT Bot!');

    client.user?.setPresence({
        activity: {
            name: "阿弥陀経",
            url: 'https://ja.wikisource.org/wiki/仏説阿弥陀経'
        },
        status: 'online'
    })
})

client.on('message', async ctx => {
    const message = ctx.content
    const channel = ctx.channel

    console.log(`Recieved: ${message} at ${channel}`)

    if (!message.startsWith(PREFIX)) {
        return
    }

    const command = message.slice(1)

    switch (command) {
        case 'ping':
            ping(ctx); break

        case 'members':
            members(ctx); break

        case 'avatar':
            avatar(ctx); break

        case 'stories':
            stories(ctx); break

        default:
            ctx.channel.send(`${ctx.author}、貴方は何を言っていますか？`)
            break;
    }
})

client.login(TOKEN)
