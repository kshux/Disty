/**
 * Bot Info
 * This module is to output information on on the bot. It will output an embed with general information about the bot.
 * You can update all of the output from the config.json file.
 * You are not required to keep Powered By Disty but... please do ;)
 *
 * Version: 1.0.0
 * Author: Kieran Heron <hello@kieran.pro>
 */

const Discord = module.require("discord.js");
const config = require('../config.json');

module.exports.run = async (disty, message, args) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(config.app.modules.botInfo.author)
        .setDescription(config.app.modules.botInfo.description)
        .setColor("#" + config.app.modules.botInfo.color)
        .setFooter(config.app.modules.botInfo.footer);

    message.delete();
    if(!config.app.sendResultsViaDM === true) {
        message.channel.send({embed: embed});
    } else {
        message.member.send({embed: embed});
    }

}

module.exports.help = {
    command: "botinfo",
    description: "Display the bot information"
}
