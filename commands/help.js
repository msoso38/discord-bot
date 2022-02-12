const { DiscordAPIError } = require('discord.js')
const Command = require('./command.js')
const Discord = require('discord.js')

module.exports = class Help extends Command {
    

    static match (message) {
        return message.content === ('!v help')
    }

    static action (message) {
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor('Vitrax')
        .setTitle('Help message :')
        .addField('Commande Admin :', '!v ban \n!v kick.')
        .addField('Commande normale :', '!v ping \n!v google [argument] \n!v invite \n!v avatar.')
        .setColor('3fccb5')
        )
    }
}