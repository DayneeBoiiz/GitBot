const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GITHUB_API_TOKEN } = require("../config/config.json");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commits")
    .setDescription("Shows recent commits in a GitHub repository"),
  async execute(interaction) {
    try {
      const repositoryName = interaction.options.getString("repository");

      const response = await axios.get(
        `https://api.github.com/repos/${repositoryName}/commits`,
        {
          Headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const commits = response.data;

        if (commits.length === 0) {
          const embed = new EmbedBuilder()
            .setColor("#FF5733")
            .setDescription("No commits found in the specified repository.");
          await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const commitList = commits
            .slice(0, 5)
            .map((commit) => {
              const commitAuthor = commit.commit.author.name;
              const commitMessage = commit.commit.message;
              const commitSHA = commit.sha;

              return `\n**SHA:** ${commitSHA}\n**Author:** ${commitAuthor}\n**Message:** ${commitMessage}\n`;
            })
            .join("\n");

          const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle(`Recent Commits in ${repositoryName}`)
            .setDescription(commitList);
          await interaction.reply({ embeds: [embed], ephemeral: true });
        }
      } else {
        const embed = new EmbedBuilder()
          .setColor("#FF5733")
          .setDescription(
            "Failed to fetch commits from the GitHub repository."
          );
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.logO(error.message);
      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setDescription("An error occurred while fetching commits.");
      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
