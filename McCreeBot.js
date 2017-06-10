const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '~';
//const dispatcher = connection.playFile('mnt/c/Users/Gabe/Downloads/highNoon.mp3');

client.login('MzIyNDM4MzcxODQ4ODgwMTMw.DByWrQ.vZb-9j5zfKszPU4clvOrCfpHSmw');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

  if (message.content === prefix + 'time') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
          //connection.playFile();
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});
