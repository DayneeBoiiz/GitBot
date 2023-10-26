const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");
const { GITHUB_API_TOKEN } = require("../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userrepos")
    .setDescription("List repositories owned by a GitHub user"),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const username = interaction.options.getString("username");

      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const repositories = response.data;
        if (repositories.length === 0) {
          const noReposEmbed = new EmbedBuilder()
            .setTitle("User's Repositories")
            .setDescription("The user does not own any repositories.")
            .setColor("#ff0000");
          await interaction.reply({ embeds: [noReposEmbed] });
        } else {
          const repoEmbeds = repositories.map((repo) => {
            return new EmbedBuilder()
              .setTitle(repo.name)
              .setURL(repo.html_url)
              .setColor("#00ff00"); // You can set a custom color
          });

          // Split the repoEmbeds into chunks of 10
          const chunkedEmbeds = [];
          while (repoEmbeds.length) {
            chunkedEmbeds.push(repoEmbeds.splice(0, 10));
          }

          // Send each chunk of embeds as a separate message
          for (const chunk of chunkedEmbeds) {
            await interaction.followUp({ embeds: chunk, ephemeral: true });
          }
        }
      } else {
        await interaction.reply("Failed to fetch user repositories.", {
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.reply(
        "An error occurred while fetching user repositories.",
        { ephemeral: true }
      );
    }
  },
};
