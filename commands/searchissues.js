const { SlashCommandBuilder } = require("discord.js");
const { GITHUB_API_TOKEN } = require("../config/config.json");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("searchissues")
    .setDescription("Search for issues in a GitHub repository"),
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const repositoryName = interaction.options.getString("repository");
      const keyword = interaction.options.getString("keyword");

      const searchQuery = `repo:${repositoryName} is:issue ${keyword}`;

      const response = await axios.get(
        `https://api.github.com/search/issues?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        const issues = response.data.items;

        if (issues.length === 0) {
          await interaction.reply(
            "No issues found with the specified keyword."
          );
        } else {
          const issueList = issues
            .map(
              (issue) =>
                `**Title:** ${issue.title}\n**URL:** ${issue.html_url}\n`
            )
            .join("\n");

          const responseChunks = splitText(issueList, 1950);

          for (const chunk of responseChunks) {
            await interaction.followUp(chunk);
          }
        }
      } else {
        await interaction.reply(
          "Failed to fetch issues from the GitHub repository."
        );
      }
    } catch (error) {
      console.error(error.message);
      await interaction.reply("An error occurred while searching for issues.");
    }
  },
};

function splitText(text, chunkSize) {
  const regex = new RegExp(`.{1,${chunkSize}}`, "g");
  return text.match(regex);
}
