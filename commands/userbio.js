const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { GITHUB_API_TOKEN } = require("../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userbio")
    .setDescription("Shows the bio of a GitHub user"),

  async execute(interaction) {
    try {
      const username = interaction.options.getString("username");

      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          Headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;
        const bio = userData.bio || "No bio available.";
        const avatarUrl = userData.avatar_url;

        const embed = new EmbedBuilder()
          .setColor("#3498db")
          .setTitle(`${username}'s GitHub Bio`)
          .setDescription(bio)
          .setThumbnail(avatarUrl);

        await interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        const embed = new EmbedBuilder()
          .setColor("#FF5733")
          .setDescription("Failed to fetch the user's bio from GitHub.");
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.log(error.message);
      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setDescription("An error occurred while fetching the user's bio.");
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
