const {Client, Events, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
    
});

client.login(token);

client.once(Events.ClientReady, readyClient => { 
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

// client.on("messageCreate", msg => {
//     if (msg.content === "ping"){
//         console.log("Ping received!");
//         msg.reply({content: 'pong'});
//     }
// });


