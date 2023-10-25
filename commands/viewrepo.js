/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require("discord.js");
const { GITHUB_API_TOKEN } = require("../config/config.json");

async function getRepositoryInfo(repositoryName) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repositoryName}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        },
      }
    );

    if (response.ok) {
      const repoData = await response.json();
      const { full_name, description, html_url, forks, stargazers_count } =
        repoData;

      const contributorsResponse = await fetch(`${repoData.contributors_url}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        },
      });
      let contributors = [];
      if (contributorsResponse.ok) {
        contributors = (await contributorsResponse.json()).map(
          (contributor) => contributor.login
        );
      }

      return {
        full_name,
        description,
        html_url,
        forks,
        stargazers_count,
        contributors,
      };
    } else {
      throw new Error(
        `Failed to fetch repository information: ${response.status}`
      );
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("viewrepo")
    .setDescription("View information about a GitHub repository"),
  async execute(interaction) {
    const data = JSON.parse(
      JSON.stringify(interaction.options._hoistedOptions)
    );
    const value = data[0].value;

    try {
      const repoInfo = await getRepositoryInfo(value);
      const {
        full_name,
        description,
        html_url,
        forks,
        stargazers_count,
        contributors,
      } = repoInfo;

      const message = `**Repository Name:** ${full_name}\n**Description:** ${description}\n**GitHub URL:** ${html_url}\n**Forks:** ${forks}\n**Stars:** ${stargazers_count}\n**Contributors:** ${contributors.join(
        ", "
      )}`;

      await interaction.reply(message);
    } catch (error) {
      await interaction.reply(
        `Failed to fetch repository information: ${error.message}`
      );
    }
  },
};
