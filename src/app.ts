/// <reference path="@types/discord.d.ts" />

import { Client, Collection, Intents, Message } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { readdirSync } from 'fs'
import { die } from './lib/Util'

// Logger
import { getLogger } from 'log4js'
const logger = getLogger()
logger.level = "debug"

// Database
const prisma = new PrismaClient()
prisma.$connect()

// system
require('dotenv').config()

// Tokens
const TOKEN = process.env['TOKEN'] || "aaa"
const PREFIX = process.env['PREFIX'] || "-"

logger.info('Booting BUDDHAMIT Bot...')

// Command registration
const client = new Client({
    ws: {
        intents: new Intents([
            Intents.NON_PRIVILEGED,
            'GUILD_MEMBERS'
        ])
    }
})
client.commands = new Collection()
client.logger = logger
client.prisma = prisma

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

client.on('error', async () => {
    await prisma.$disconnect()
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

        ctx.reply('DM に送信します……')
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

client.on('messageDelete', ctx => {
    const permission = process.env['MESSAGE_PROHIBIT']

    if (!permission) {
        return
    }

    if (!ctx.member?.roles.cache.has(permission)) {
        return
    }

    const author = ctx.author?.tag
    const content = ctx.content

    if (ctx.author?.bot) {
        ctx.channel.send(`${content}`)
        return
    }

    ctx.channel.send(`${author} ${content}`)
})

client.login(TOKEN)

