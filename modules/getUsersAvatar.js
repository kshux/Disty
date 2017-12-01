/**
 * User Avatar
 * Really simple module to grab the user's avatar
 *
 * Version: 1.0.0
 * Author: Kieran Heron <hello@kieran.pro>
 */

const Discord = module.require("discord.js");
const config = require('../config.json');

module.exports.run = async (disty, message, args) => {
    let msg = await message.channel.send(config.app.modules.getUsersAvatar.messages.generating);

    await message.channel.send({files: [
        {
            attachment: message.author.displayAvatarURL,
            name: `${message.author.username}-avatar.png`
        }
    ]});

    message.delete();
    msg.delete();
}

module.exports.help = {
    command: "avatar",
    description: "Get the user's avatar"
}
