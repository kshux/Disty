/**
 * Disty
 * An open source discord bot written in NodeJS. Simple & Hackable.
 * Author: Kieran Heron < hello@kieran.pro >
 * GitHub: https://github.com/kshux/disty
 * License: MIT
 */


const config = require('./config.json'); // Load the config
const auth = require('./auth_config.json'); // Load the authentication config
const Discord  = require('discord.js'); // Load the discord.js
const disty = new Discord.Client(); // Newup a discord client
const fs = require('fs'); // Load fs (ITS NOT A BAD WORD!)
const sql = require('sqlite'); // Load SQLITE because we are poor and don't host mysql servers...
sql.open("./points.sqlite"); // Open the points... go do it...
const talkedRecently = new Set(); // Set the dirty spammers collection
disty.commands = new Discord.Collection(); // Set the commands to discord collection... i don't know, ask discord.js


/**
 * Load all the sweg modules init
 */
fs.readdir("./modules/", (err, files) => {
    if(err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        // This will only show if you broke something... shame on you!
        console.log("No no! no modules to load");
        return;
    }

    // Only here to make the bot scream into the console....
    console.log('Loading modules....');

    // Set the commands... that is all
    jsfiles.forEach((f, i) => {
        let props = require(`./modules/${f}`);
        disty.commands.set(props.help.command, props);
    });
});


/**
 * Spit something into the console & set the game that the bot is playing when the bot is ready.
 */
disty.on('ready', () => {
    console.log(`Logged in as ${disty.user.tag}`);
    disty.user.setGame(config.app.botIsPlaying);
});


/**
 * Send a sweg dm to the new user of the server
 */
if(config.app.modules.sendDMOnUserJoin.enabled === true) {
    disty.on('guildMemberAdd', member => {
        member.send(config.app.modules.sendDMOnUserJoin.message);
    });
}


/**
 * Message event, deals with everything else init ;)
 */
disty.on('message', async (message) => {
    // Stop botception
    if(message.author.disty) return;

    // Don't allow commands in the dm's. Don't slide into my bots dm's!
    if(message.channel.type === "dm") return;

    // Stop the spammers
    if (talkedRecently.has(message.author.id)) return;

    // Add user to spam list for a time
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, config.app.commandCoolDown);

    // Deal with all the messages and commands... that is all
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(config.app.prefix)) return;

    let cmd = disty.commands.get(command.slice(config.app.prefix.length));
    if(cmd) cmd.run(disty, message, args);
});


/**
 * Log disty in... becuase sweg
 */
disty.login(auth.discord);
