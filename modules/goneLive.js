/**
 * Gone Live
 * This module was developed for use on the stream kings discord server but can be used by anyone.
 * It will allow users to post their stream links with the !live command, and the bot will throw
 * it into a live channel of your choice. Follow the docs on the wiki for more information on how
 * to confiure this.
 *
 * Version: 1.0.0
 * Author: Kieran Heron <hello@kieran.pro>
 */


// TODO
// Better link checking, check if it is a twithc link
// ALso, use the twitch api and get better info from the users
const Discord = module.require("discord.js");
const config = require('../config.json');
const url = require('valid-url');

module.exports.run = async (disty, message, args) => {

    const link = message.content.split(' ')[1];

    // Initial check for urls...
    if(!url.isUri(link)) {
        message.delete();
        message.member.send(config.app.modules.goneLive.messages.invalidURL);
        return;
    }

    // Check if the link contains twitch.tv, this is not correct way... but meh change it later
    if(!link.includes('twitch.tv' || 'go.twitch.tv')) {
        message.delete();
        message.member.send(config.app.modules.goneLive.messages.notTwitchLink);
        return;
    };

    let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} ${config.app.modules.goneLive.messages.goneLive}`)
        .setURL(link)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("#6441A4");

    message.delete();
    let channel = disty.channels.find("name", config.app.modules.goneLive.liveChannel).send({ embed: embed });

}

module.exports.help = {
    command: "live",
    description: "Allows a user to show that they went live!"
}
