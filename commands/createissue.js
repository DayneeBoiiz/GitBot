const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const { GITHUB_API_TOKEN } = require("../config/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createissue")
    .setDescription("Create a new issue in a GitHub repository"),
  async execute(interaction) {
    try {
      const repositoryName = interaction.options.getString("repository");
      const issueTitle = interaction.options.getString("title");
      const issueDescription = interaction.options.getString("description");

      const response = await axios.post(
        `https://api.github.com/repos/${repositoryName}/issues`,
        {
          title: issueTitle,
          body: issueDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        await interaction.reply("New issue created successfully.", {
          ephemeral: true,
        });
      } else {
        await interaction.reply("Failed to create the issue.", {
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while creating the issue.", {
        ephemeral: true,
      });
    }
  },
};
