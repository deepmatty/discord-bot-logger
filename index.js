const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
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

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        //set a new item in Collection with key as command name and value as exported module
        if ('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }
}

//Listener that creates an interaction event. 
client.on(Events.InteractionCreate, interaction => { 
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

// client.on("messageCreate", msg => {
//     if (msg.content === "ping"){
//         console.log("Ping received!");
//         msg.reply({content: 'pong'});
//     }
// });


