/**
 * Member Count
 * A simple module to output the current member count.
 *
 * Version: 1.0.0
 * Author: Kieran Heron <hello@kieran.pro>
 */

const Discord = module.require("discord.js");
const config = require('../config.json');

module.exports.run = async (disty, message, args) => {

    // TODO
    // Allow a custom message from the configs
    let Guild = disty.guilds.get(config.app.guildID);
    let memberCount = Guild.memberCount;
    let embed = new Discord.RichEmbed()
        .setAuthor(Guild.name + ' Member Count')
        .setDescription(`The server currently has **${memberCount} members!!!**`)
        .setColor(`#${config.app.brandColorPrimary}`)
        .setFooter(`Invite your friends using ${config.app.inviteLink}`);

    message.delete();
    if (!config.app.sendResultsViaDM === true) {
        message.channel.send({ embed: embed });
    } else {
        message.member.send({ embed: embed });
    }

}

module.exports.help = {
    command: "membercount",
    description: "Shows the member count for the guild."
}
