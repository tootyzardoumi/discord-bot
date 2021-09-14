const Discord = require('discord.js');
const musichelper = require('./musichelper');

require('dotenv').config()
const client = new Discord.Client();
client.player = new musichelper();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    const commandprefix = "/";
    const args = message.content.slice(commandprefix.length).trim().split(' ')
    const command = args.shift().toLowerCase()

if(!message.member || !message.guild)
  {
      return;
  }
if(!message.content.startsWith(commandprefix) || message.author.bot)
    {
        return;
    }

if(!isuserinvoicechannel(message))
{
    message.reply('you need to join voice channel please ya doctor')
    return;
}
// music play (link)
if (command === 'music') {
    const connection = await message.member.voice.channel.join()
    const [musicVerb,musiccLink] = args
    if(!connection){
        return;
    }
    switch(musicVerb){
        case 'play':
            client.player.queuesong(connection,musiccLink)
            return;
        case 'next':
            client.player.skipsong(connection)
            return;
        case 'print':
            client.player.printqueue(message)
            return;
        default:
            message.reply('command not found')
            return;
    }
  }
  
});

function isuserinvoicechannel(message)
{
    return !!message.member.voice.channel
}

client.login(process.env.MSBBOT_TOKEN);