const Discord = require('discord.js')
const fs = require('fs')


const bot = new Discord.Client()
bot.commands = new Discord.Collection()

bot.setMaxListeners(25)

//init du bot
bot.on('ready', () => {
    console.log(`Connecté en tant que : ${bot.user.tag} !!!`)
    console.log(`Marche avec : ${title}`)
  });

bot.on('ready', function () {
    bot.user.setActivity('!v help')
    bot.user.setStatus('dnd')
})

//recherche de commande
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    bot.commands.set(command.name, command)
}

//info
const {prefix} = require('./info.json')

//commande
const Invite = require('./commands/invite');
const Help = require('./commands/help')
const { title, config } = require('process');
const { type } = require('os');

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(channel => channel.name('bienvenue'));
  channel.send(`Welcome to the server, ${member}`);
});

bot.on('message', message => {
  if (message.content.startsWith('!v google')) {
    let args = message.content.split(' ')
    args.shift()
    message.reply(new Discord.MessageEmbed().setTitle('Recherche google : ').addField('https://www.google.com/search?q=' + args.join('%20'))
    )
  }
})

bot.on('message', message => {
  if (message.content === '!v ping') {
  message.channel.send(new Discord.MessageEmbed() .setTitle('Chargement') .setColor('3fccb5')).then (async (msg) =>{
    msg.delete()
    message.channel.send(new Discord.MessageEmbed()
    .setTitle('Pong, ')
    .addField('Le ping est de : ', `${msg.createdTimestamp - message.createdTimestamp}ms !!!`)
    .addField(`Le ping de l'API est de : `, `${Math.round(bot.ws.ping)}ms !!!`)
    .setColor('3fccb5')
      
    );
  })
  }
});



bot.on('message', function (message) {
    let commandUsed = 
    Invite.parse(message) ||
    Help.parse(message)
})

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`${prefix}kick`)) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            message.channel.send(`${user.tag} a été kické`);
          })
          .catch(err => {
            message.reply('Cet utilisateur est trop haut gradée');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("Vous devez mentionner un utilisateur!");
    }
  }
});

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(`${prefix}ban`)) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.channel.send(`${user.tag} a été banni`);
          })
          .catch(err => {
            message.reply('Cet utilisateur est trop haut gradé');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("Vous devez mentionner un utilisateur!");
    }
  }
});

bot.on('message', message => {
  if (message.content === ('!v test')) {
      message.channel.send(new Discord.MessageEmbed()
      .setTitle('Test')
      .setDescription('tesst **bonjour**')
      .addField('**bonjour**', 'Slt, \n Cv ?')
      .addField('Je test c super \n !!!')
      .setColor('3fccb5')
      )
  }
})

bot.on('guildMemberAdd', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(`${member}`, new Discord.MessageEmbed()
      .setDescription(`${member} a rejoint le serveur. Nous sommes désormais ${member.guild.memberCount} ! 🎉`)
      .setColor('3fccb5'))
  member.roles.add(config.greeting.role)
})

bot.on('message', message => {
  if (message.content === ('!v créa')) {
    message.reply(new Discord.MessageEmbed()
    .setTitle('Le créa et son serveur :')
    .addField('Créa : ', 'Le créa est Msoso38')
    .addField('Lien : ', 'le lien : https://discord.gg/8kWztKjjhh')
    .setColor('3fccb5')
    .setImage('https://i.pinimg.com/originals/b9/4f/41/b94f4148f2f03c5709740cada4d0f899.jpg')
    )
  }
})

bot.on('message', message => {
  if (message.content === ('!v avatar')) {
    message.channel.send(new Discord.MessageEmbed()
    .setTitle('Votre avatar')
    .setColor('3fccb5')
    .setURL(message.author.displayAvatarURL())
    .setImage(message.author.displayAvatarURL())
    .setDescription(message.author.username)
    )
  }
})

bot.on('message', message =>{
  if (message.content === (`${prefix}test22`)) {
    message.reply(`Merci d'avoir testé !!!`)
  }
})


bot.on('message', message => {
  if (message.content === (`${prefix}salomé`)) {
    message.reply('C ma soeur.\nxD')
  }
})

bot.on('message', message => {
  if(message.content === (`${prefix}couscous`)) {
    message.reply('VIVE LE COUSCOUS !!!!!')
  }
})

bot.login(process.env.TOKEN)
