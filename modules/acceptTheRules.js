/**
 * Accept The Rules
 * This module will allow you to get users to accept the rules before they can interact with the rest of your server.
 * Follow the setup on our wiki to use the command correctly.
 *
 * Version: 1.0.0
 * Author: Mark Heron
 */

const Discord = module.require("discord.js");
const config = require('../config.json');

module.exports.run = async (disty, message, args) => {
    const acceptedChannels = config.app.modules.acceptTheRules.acceptedChannels;

    if(!acceptedChannels.includes(message.channel.name)) {
        message.delete();
        message.member.send(config.app.modules.acceptTheRules.messages.wrongChannel);
        return;
    }

    const memberRole = message.guild.roles.find('name', config.app.modules.acceptTheRules.roleGivenOnSuccess);

    if (message.member.roles.has(memberRole.id)) {
        message.member.send(config.app.modules.acceptTheRules.alreadyAccepted);
        message.delete();
        return;
    };

    message.member.addRole(memberRole).then(() => {
        message.delete();
        message.member.send(config.app.modules.acceptTheRules.successMessage);
    });
}

module.exports.help = {
    command: "accept",
    description: "Ability to accept the rules of the server."
}
