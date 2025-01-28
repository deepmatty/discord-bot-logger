const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('cross')
        .setDescription('Shows the user their crosses'),
        
    async execute(interaction, profileData){
        const { crosses } = profileData;
        const username = interaction.user.username;

        if (crosses == 1){
            await interaction.reply(`${username} has ${crosses} cross.`);
        } else{
            await interaction.reply(`${username} has ${crosses} crosses.`);
        }
    },
};