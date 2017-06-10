const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '~';


client.login('MzIyNDM4MzcxODQ4ODgwMTMw.DByWrQ.vZb-9j5zfKszPU4clvOrCfpHSmw');

function highNoon (msg) {
  if ((msg.member.voiceChannel)&&(msg.member.hasPermission('MANAGE_CHANNELS', 'checkAdmin'))){
    msg.member.voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./highNoon.mp3');
        msg.reply('Uh huh, you know what time it is.');
    })
    .catch(console.log);


  } else if (msg.member.voiceChannel) {
      msg.reply('Who\'re you?')
  } else {
      msg.reply('I can\'t tell you the time if you don\'t let me.');
  }
}

function roulette(msg) {

}

function flashbang(msg) {

}

function commands(msg) {

}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  if (!message.guild) return;

  if (message.content === prefix + 'time'){
    highNoon(message);} //Deafen or afk all members in a voiceChannel

  if (message.content === prefix + 'spin') {
    roulette(message);} //Deafen a single random member in the voiceChannel

  if (message.content === prefix + 'flashbang') {
    flashbang(message);} //Mute

  if ((message.content === prefix + 'help') || (message.content === prefix + 'commands')) {
    commands(message);} //Direct message a list of commands

});
