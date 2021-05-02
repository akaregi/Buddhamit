/// <reference path="typings/discord.d.ts" />

import { Client, Collection, Message } from 'discord.js'
import { readdirSync } from 'fs'

// Logger
import { getLogger } from 'log4js'
const logger = getLogger()
logger.level = "debug"

// system
require('dotenv').config()

// Tokens
const TOKEN = process.env['TOKEN'] || "aaa"
const PREFIX = process.env['PREFIX'] || "-"

logger.info('Booting BUDDHAMIT Bot...')

// Command registration
const client = new Client()
client.commands = new Collection()

const files = readdirSync('./src/commands')
    .filter(file => file.endsWith('.ts'))
    .map(file => file.slice(0, -3))

for (const file of files) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// Logic
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

client.on('message', async (ctx: Message) => {
    if (!ctx.content.startsWith(PREFIX) || ctx.author.bot) {
        return
    }

    const args = ctx.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift()?.toLowerCase();

    // It logs.
    logger.debug(`${ctx.author.username} ${ctx.content}`)

    // Checks if command exists. Exits when not exist.
    if (!command || !client.commands.has(command)) {
        ctx.reply('貴方は何を言っていますか？')
        return
    }

    try {
        client.commands.get(command)!.execute(ctx, args)
    } catch (error) {
        logger.error(error)
        ctx.reply('ブッダでもどうしようもないことが起こりました。')
    }
})

client.login(TOKEN)
