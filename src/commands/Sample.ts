import { Command, Message } from "discord.js"

const command: Command = {
    name: '',
    description: '',
    execute(ctx: Message, args: string[]) {
        ctx.react('👍')
    }
}

// export = command
