const Discord = require('discord.js')
const Command = require('./command.js')

module.exports = class invite extends Command {
    

    static match (message) {
        return message.content.startsWith('!v invite')
    }

    static action (message) {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('Cliquez ICI pour inviter le bot.')
        .setURL('https://discord.com/oauth2/authorize?client_id=888423456289472522&scope=bot&permissions=1099511627775')
        .setColor('3fccb5')
        .setAuthor(message.author.username)
        )
    }
}
//https://discord.com/oauth2/authorize?client_id=807675118557069372&scope=bot&permissions=2147483647
