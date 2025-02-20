const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");
const profileModel = require("../../models/profileSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Rank of members"),
  async execute(interaction, profileData) {
    await interaction.deferReply();
    const { id } = interaction.user;
    const { crosses } = profileData;

    //finding server nickname
    const member = await interaction.guild.members.fetch(id);
    const serverNickname = member.nickname || member.user.username;

    let leaderboardEmbed = new EmbedBuilder()
      .setTitle("** Cross Leaderboard **")
      .setColor(0x45d6fd)
      .setFooter({ text: "You are not ranked yet" });

    const members = await profileModel
      .find()
      .sort({ crosses: -1 })
      .catch((err) => console.log(err));

    const memberIdx = members.findIndex((member) => member.userId === id);
    leaderboardEmbed.setFooter({
      text: `${serverNickname}, you have ${crosses} crosses`,
    });

    let description = "";
    for (let i = 0; i < members.length; i++) {
      let { user } = await interaction.guild.members.fetch(members[i].userId);

      if (!user) return;
      let userCrosses = members[i].crosses;
      const serverNickname = user.displayName;
      description += `**${
        i + 1
      }. ${serverNickname}:** ${userCrosses} crosses \n`;
    }
    if (description !== "") {
      leaderboardEmbed.setDescription(description);
    }
    await interaction.editReply({ embeds: [leaderboardEmbed] });
  },
};
