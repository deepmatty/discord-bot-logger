const {SlashCommandBuilder} = require('discord.js');
const profileModel = require("../../models/profileSchema");

module.exports = {
    data : new SlashCommandBuilder()
        .setName('snack')
        .setDescription('Removes late crosses of user')
        .addUserOption((option) => 
            option  
                .setName("user")
                .setDescription("The user you want to log late attendance")
                .setRequired(true)
        )
        .addIntegerOption((option) => 
            option  
                .setName("amount")
                .setDescription("amount of crosses")
                .setRequired(true)
                .setMinValue(1)
        ),
    async execute(interaction, profileData){
        await interaction.deferReply();
        const recievedUser = interaction.options.getUser("user");
        const amountOfCrosses = interaction.options.getInteger("amount");
        // Get the member object to access server-specific information
        const member = await interaction.guild.members.fetch(recievedUser.id);
        // Get the nickname, fallback to the global username if no nickname exists
        const serverNickname = member.nickname || recievedUser.username;

        let userProfile = await profileModel.findOne({ userId: recievedUser.id });

        if (!userProfile) {
            // If the profile doesn't exist, create a new profile with default values
            try {
                userProfile = await profileModel.create({
                    userId: recievedUser.id,
                    serverId: interaction.guild.id,
                });
            } catch (error) {
                console.error("Error creating default profile:", error);
                return await interaction.editReply("There was an error creating the profile.");
            }
        }

        const {crosses} = profileData;

        const receiveUserData = await profileModel.findOneAndUpdate(
            {
                userId: recievedUser.id,
            },
            {
                $inc: {
                    crosses : -amountOfCrosses,
                },
            }
        );


        interaction.editReply(`You have removed ${serverNickname} of ${amountOfCrosses} cross(es)`);
    },
};