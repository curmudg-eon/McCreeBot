const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '~';



client.login('MzIyNDM4MzcxODQ4ODgwMTMw.DByWrQ.vZb-9j5zfKszPU4clvOrCfpHSmw');

function highNoon (msg) {
  if (!msg.member.voiceChannel)  {
    msg.reply('I can\'t tell you the time if you don\'t let me.');
    return; }

  var targets = msg.member.voiceChannel.members.array(); //there has to be a better way to do this
  msg.member.voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./highNoon.mp3');
      msg.reply('Uh huh, you know what time it is.');

      dispatcher.on('end', () => {
        msg.channel.send('The members are' + targets);

        for (var i = 0, len = targets.length; i < len; i++) {
          targets[i].setMute(false);
          targets[i].setDeaf(false);
        }
      });
    })
    .catch(console.log);
}

function revive(msg) {
  msg.member.setMute(false);
  msg.member.setDeaf(false);
}

function roulette(msg) {

}

function flashbang(msg) {

}

function commands(msg) {
  msg.member.createDM();
  msg.member.send('Horse cock');
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if ((message.content === prefix + 'help') || (message.content === prefix + 'commands')) {
    commands(message);}

  if (!message.guild) return;

  if (message.content === prefix + 'revive') {
    revive(message);
  }

  if ((message.member.voiceChannel)&&(message.member.hasPermission('MANAGE_CHANNELS', 'checkAdmin'))) {
  if (message.content === prefix + 'time'){
    highNoon(message);} //Deafen or afk all members in a voiceChannel

  if (message.content === prefix + 'spin') {
    roulette(message);} //Deafen a single random member in the voiceChannel

  if (message.content === prefix + 'flashbang') {
    flashbang(message);} //Mute
  } else if (!message.member.voiceChannel){
      message.reply('What\'s that? Can\'t hear ya.');
  } else if (!(message.member.voiceChannel)&&(message.member.hasPermission('MANAGE_CHANNELS', 'checkAdmin'))) {
      message.reply('Who\'re you?'); }
});
