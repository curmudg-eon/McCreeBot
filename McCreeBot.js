const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '~';



client.login('');

function permissionCheck (msg) {
  if ((msg.member.voiceChannel)&&(msg.member.hasPermission('MANAGE_CHANNELS', 'checkAdmin'))) 
    return true;
  else 
    return false;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function highNoon (msg) {
  msg.member.voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./highNoon.mp3');

      dispatcher.on('end', () => {
        msg.member.voiceChannel.leave();
        msg.reply('Uh huh, you know what time it is.'); //I should really learn to make it wait.
        
        var targets = msg.member.voiceChannel.members.array();
        for (var i = 0, len = targets.length; i < len; i++) {
          targets[i].setMute(true);
          targets[i].setDeaf(true);
        }
     });

    })
    .catch(console.log);

}

function revive(msg) {
  msg.member.setMute(false);
  msg.member.setDeaf(false);
}

function reviveAll(msg) {
msg.member.voiceChannel.join()
  .then(connection => {
  var targets = msg.member.voiceChannel.members.array();
  for (var i = 0, len = targets.length; i < len; i++) {
    targets[i].setMute(false);
    targets[i].setDeaf(false);
    targets[i].createDM();
    targets[i].send('You just been shot dead. ~revive when you\'re ready to respawn.');
  }
        const dispatcher = connection.playFile('./herosNeverDie.ogg');
        dispatcher.on('end', () => {
          msg.member.voiceChannel.leave();
        });
      });
}

function roulette(msg) {
  msg.reply('spinnin\'');
  var targets = msg.member.voiceChannel.members.array();
  msg.member.voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./hadToDoIt.mp3');
      dispatcher.on('end', () => {
        msg.member.voiceChannel.leave();
        var goon = getRandomInt(0, targets.length);
        targets[goon].setMute(true);
        targets[goon].setDeaf(true);
      });
  });
}

function flashbang(msg) {
  var targets = msg.member.voiceChannel.members.array();
  msg.member.voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./excuseMe.mp3');
      dispatcher.on('end', () => {
        msg.member.voiceChannel.leave();
      });
      for (var i = 0, len = targets.length; i < len; i++)
        targets[i].setMute(true);
  });
}

function commands(msg) {
  msg.member.createDM();
  msg.member.send('Basic Commands: \n ~help\n ~revive\n\nManage Channels Commands:\n ~time\n ~spin\n ~flashbang\n ~revive all');
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`type ~help for help partner`);
});


client.on('message', message => {

  if ((message.content === prefix + 'help') || (message.content === prefix + 'commands'))
    commands(message);

  if (!message.guild) return;

  if (message.content === prefix + 'revive')
    revive(message);

  if (permissionCheck(message) === true) {
    if (message.content === prefix + 'time')
      highNoon(message); //Deafen all members in a voiceChannel

    if (message.content === prefix + 'revive all') 
      reviveAll(message);

    if (message.content === prefix + 'spin')
      roulette(message); //Deafen a single random member in the voiceChannel

    if (message.content === prefix + 'flashbang')
      flashbang(message); //Mute
  }
});
