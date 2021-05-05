// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="@types/discord.d.ts" />

// system
import { readdirSync } from 'fs'

// Database
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
prisma.$connect()

// Logger
import { getLogger } from 'log4js'
const logger = getLogger()
logger.level = 'debug'

// Events
import { preventMessageDelete } from './events/MessageDelete'
import { dispatchCommand } from './events/CommandDispatch'
import { ready } from './events/Ready'

// Tokens
import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env['TOKEN'] || 'aaa'
const PREFIX = process.env['PREFIX'] || '-'

logger.info('Booting BUDDHAMIT Bot...')

// Client initialization
import { Client, ClientOptions, Collection, Intents, Message } from 'discord.js'

const discordOpts: ClientOptions = {
    ws: {
        intents: new Intents([
            Intents.NON_PRIVILEGED,
            'GUILD_MEMBERS'
        ])
    }
}

const client = new Client(discordOpts)
client.commands = new Collection()
client.prefix = PREFIX
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

// Logic
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

client.login(TOKEN)

