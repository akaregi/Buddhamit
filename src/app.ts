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
    logger.info(`Logging in as ${client.user?.tag ?? 'unknown'}`)
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
    // Neither illegal prefix nor sent by bot
    if (!ctx.content.startsWith(PREFIX) || ctx.author.bot) {
        return
    }

    const args = ctx.content.slice(PREFIX.length).split(/ +/)
    const command = args.shift()!!.toLowerCase(); // NOTE: Must be string

    // It logs.
    logger.debug(`${ctx.author.username} ${ctx.content}`)

    // Help command
    if (command === 'help') {
        let text = '以下のコマンドが使えます：'
        for (const cmd of client.commands) {
            const command = cmd[1]
            const alises = command.aliases
                ?.map(cmd => `\`${cmd}\``)
                .join(', ') ?? 'エイリアスなし'

            text += '\n' +
                    `\`${PREFIX}${command.usage ?? command.name}\`` +
                    ` (${alises})\n` +
                    `${command.description}\n`
        }

        ctx.react('👍');
        (await ctx.author.createDM()).send(text)
        return
    }

    try {
        const target = client.commands.get(command)
            ?? client.commands
                .find(cmd => (cmd.aliases && cmd.aliases.includes(command)) ?? false)

        // Checks if command exists. Exits when not exist.
        // Excludes -help.
        if (!target) {
            return die(ctx, 'あなたは何を言っていますか?')
        }

        target.execute(ctx, args)
    } catch (error) {
        logger.error(error)
        return die(ctx, 'ブッダでもどうしようもないことが起こりました。')
    }
})

client.login(TOKEN)

function die (ctx: Message, message: string) {
    ctx.react('❌')
    ctx.reply(message)
}
