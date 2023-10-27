const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apistatus")
    .setDescription("Checks the status of the GitHub API"),
  async execute(interaction) {
    try {
      const response = await axios.get("https://api.github.com");

      if (response.status === 200) {
        const embed = new EmbedBuilder()
          .setColor("#2ecc71")
          .setTitle("GitHub API Status")
          .setDescription(
            "The GitHub API is currently online and operational."
          );

        await interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        const embed = new EmbedBuilder()
          .setColor("#e74c3c")
          .setTitle("GitHub API Status")
          .setDescription(
            "The GitHub API is currently offline or experiencing issues."
          );

        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.log(error.message);
      const embed = new EmbedBuilder()
        .setColor("#e74c3c")
        .setTitle("GitHub API Status")
        .setDescription(
          "An error occurred while checking the GitHub API status."
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
