import { Client as DiscordJS } from 'discord.js'

// system
require('dotenv').config()

// Logger
import { getLogger } from 'log4js'
const logger = getLogger()
logger.level = "debug"

// Command libraries
import { ping } from './commands/Ping'
import { stories } from './commands/Stories'
import { avatar } from './commands/Avatar'
import { members } from './commands/Members'

// Tokens
const TOKEN = process.env['TOKEN'] || "aaa"
const PREFIX = process.env['PREFIX'] || "-"

logger.info('Booting BUDDHAMIT Bot...')

// Command cooldown
const storiesCooldown = new Set();

// Logic
const client = new DiscordJS()

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
    if (!ctx.content.startsWith(PREFIX)) {
        return
    }

    logger.debug(`${ctx.author.username} ${ctx.content}`)

    const args = ctx.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase() as string

    if (command.startsWith('avatar')) {
        avatar(ctx, args)
        return
    }

    switch (command) {
        case 'ping':
            ping(ctx); return

        case 'members':
            members(ctx); return

        case 'stories':
            const id = ctx.author.id
            if (storiesCooldown.has(id)) {
                ctx.channel.send(`${ctx.author}よ、仏の顔も三度までという。`)
                return
            }

            stories(ctx)
            storiesCooldown.add(id)
            setTimeout(() => { storiesCooldown.delete(id) }, 10000)

            return

        default:
            break
    }

    ctx.channel.send(`${ctx.author}、貴方は何を言っていますか？`)
})

client.login(TOKEN)
