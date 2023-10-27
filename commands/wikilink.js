const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wikilink")
    .setDescription("Generates a link to the GitHub wiki of a repository"),
  async execute(interaction) {
    try {
      const repositoryName = interaction.options.getString("repository");
      const wikiLink = `https://github.com/${repositoryName}/wiki`;

      const embed = new EmbedBuilder()
        .setColor("#3498db")
        .setTitle("GitHub Wiki Link")
        .setDescription(
          `Here's the link to the wiki of the repository: [GitHub Wiki](${wikiLink})`
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.log(error.message);
      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setDescription(
          "An error occurred while generating the GitHub Wiki link."
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
