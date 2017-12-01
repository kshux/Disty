/**
 * Purge the chat
 * If you need to purge the chat, this is what to us. I will allow you to write !purge 10 and it will
 * then purge the chat of the latest 10 messages.
 *
 * Version: 1.0.0
 * Author: Kieran Heron <hello@kieran.pro>
 */

// TODO
// I want to make this module better, and allow it to purge from roles and such.
// Also, the ability to purge another channel rather than the one you are in.
// Also, a optional timed purge for channels.

const Discord = module.require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

    const purgeRoles = config.app.modules.purgeTheChat.purgeRoles;

    if(!message.member.roles.some(r=>purgeRoles.includes(r.name))) return;

    const user = message.mentions.users.first();
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2]);

    if(!amount) return message.reply(config.app.modules.purgeTheChat.messages.invalidNumber);
    if (!amount && !user) return message.reply(config.app.modules.purgeTheChat.messages.noParam);

    message.channel.fetchMessages({
        limit: amount,
    }).then((messages) => {
        if (user) {
            const filterBy = user ? user.id : bot.user.id;
            message = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

}

module.exports.help = {
    command: "purge",
    description: "Purge the chat"
}
