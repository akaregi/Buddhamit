import { Client } from 'discord.js'

export function ready(client: Client): void {
    const logger = client.logger

    logger.info(`Logging in as ${client.user?.tag ?? 'unknown'}`)
    logger.info('Booted BUDDHAMIT Bot!')

    client.user?.setPresence({
        activity: {
            name: '阿弥陀経',
            url: 'https://ja.wikisource.org/wiki/仏説阿弥陀経'
        },
        status: 'online'
    })
}
