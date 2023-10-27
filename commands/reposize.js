const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reposize")
    .setDescription("Displays the size of a GitHub repository"),
  async execute(interaction) {
    try {
      const repositoryName = interaction.options.getString("repository");
      const response = await axios.get(
        `https://api.github.com/repos/${repositoryName}`
      );

      if (response.status === 200) {
        const repoData = response.data;
        const repoSize = repoData.size;

        const embed = new EmbedBuilder()
          .setColor("#3498db")
          .setTitle("GitHub Repository Size")
          .setDescription(`The size of the repository is ${repoSize} KB`);

        await interaction.reply({ embeds: [embed], ephemeral: true });
      } else {
        const embed = new EmbedBuilder()
          .setColor("#FF5733")
          .setDescription("Failed to fetch the repository size.");

        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.log(error.message);
      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setDescription(
          "An error occurred while fetching the repository size."
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
