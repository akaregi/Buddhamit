// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="@types/discord.d.ts" />

import dotenv from 'dotenv'
import { readdirSync } from 'fs'
import { PrismaClient } from '@prisma/client'
import { getLogger } from 'log4js'

import { Client, Collection, Intents, Message } from 'discord.js'
import { preventMessageDelete } from './events/MessageDelete'
import { dispatchCommand } from './events/CommandDispatch'
import { ready } from './events/Ready'

// Prisma
const prisma = new PrismaClient()
prisma.$connect()

// log4js
const logger = getLogger()
logger.level = 'debug'

// dotenv
dotenv.config()

// Discord.js
const client = new Client({
    ws: {
        intents: new Intents([
            Intents.NON_PRIVILEGED,
            'GUILD_MEMBERS'
        ])
    }
})
client.commands = new Collection()
client.prefix = process.env['PREFIX'] || '-'
client.logger = logger
client.prisma = prisma

// Command registration
const files = readdirSync('./src/commands')
    .filter(file => file.endsWith('.ts'))
    .map(file => file.slice(0, -3))

for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

logger.info('Booting BUDDHAMIT Bot...')

client.on('ready', () => {
    ready(client)
})

client.on('error', async () => {
    await prisma.$disconnect()
})

client.on('message', async (ctx: Message) => {
    dispatchCommand(ctx)
})

client.on('messageDelete', ctx => {
    preventMessageDelete(ctx)
})

client.login(process.env['TOKEN'] || 'aaa')
