/// <reference path="@types/discord.d.ts" />

import { Client, Collection, Command, Message } from 'discord.js'
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
const helps: Partial<Command>[] = []
client.commands = new Collection()

const files = readdirSync('./src/commands')
    .filter(file => file.endsWith('.ts'))
    .map(file => file.slice(0, -3))

for (const file of files) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
    helps.push({
        name: command.name,
        description: command.description
    })
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

    // Help command
    if (command === 'help') {
        let text = '以下のコマンドが使えます：'
        for (const help of helps) {
            text += `\n\`${PREFIX}${help.name}\`\n${help.description}\n`
        }

        ctx.react('👍');
        (await ctx.author.createDM()).send(text)
        return
    }

    // Checks if command exists. Exits when not exist.
    // Excludes -help.
    if (!command || !client.commands.has(command)) {
        ctx.react('❌')
        ctx.reply(`貴方は何を言っていますか？`)
        return
    }

    try {
        client.commands.get(command)!.execute(ctx, args)
    } catch (error) {
        logger.error(error)
        ctx.react('❌')
        ctx.reply('ブッダでもどうしようもないことが起こりました。')
    }
})

client.login(TOKEN)
