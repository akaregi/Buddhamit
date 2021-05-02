import { Client as DiscordJS } from 'discord.js'

// system
import { getLogger } from 'log4js'
require('dotenv').config()

const logger = getLogger()

logger.level = "debug"

// Command libraries
import { ping } from './commands/Ping'
import { stories } from './commands/Stories'
import { avatar } from './commands/Avatar'
import { members } from './commands/Members'

// Discord Bot
const client = new DiscordJS()

const TOKEN = process.env['TOKEN'] || "aaa"
const PREFIX = process.env['PREFIX'] || "-"

logger.info('Booting BUDDHAMIT Bot...')

client.on('ready', () => {
    logger.info(`Logging in as ${client.user?.tag || 'unknown'}`)
    logger.info('Booted BUDDHAMIT Bot!')

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

    logger.debug(`${channel} ${message}`)

    if (!message.startsWith(PREFIX)) {
        return
    }

    const command = message.slice(1)

    if (command.startsWith('avatar')) {
        avatar(ctx)
        return
    }

    switch (command) {
        case 'ping':
            ping(ctx); return

        case 'members':
            members(ctx); return

        case 'stories':
            stories(ctx); return

        default:
            break
    }

    ctx.channel.send(`${ctx.author}、貴方は何を言っていますか？`)
})

client.login(TOKEN)
