const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display information about a GitHub user"),
  async execute(interaction) {
    try {
      const username = interaction.options.getString("username");

      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      if (userResponse.status === 200) {
        const userData = userResponse.data;
        const reposData = reposResponse.data;

        const avatarURL = userData.avatar_url;
        const userInformation =
          `**Name:** ${userData.name || "Not provided"}\n` +
          `**Username:** ${userData.login}\n` +
          `**Followers:** ${userData.followers}\n` +
          `**Following:** ${userData.following}\n` +
          `**Public Repositories:** ${userData.public_repos}\n` +
          `**Contributions:** ${reposData.reduce(
            (acc, repo) => acc + repo.stargazers_count,
            0
          )}`;

        const userEmbed = {
          color: 0x0099ff,
          title: `GitHub User Information for ${username}`,
          thumbnail: {
            url: avatarURL,
          },
          description: userInformation,
        };

        await interaction.reply({ embeds: [userEmbed], ephemeral: true });
      } else {
        await interaction.reply(
          "Failed to fetch user information from GitHub.",
          { ephemeral: true }
        );
      }
    } catch (error) {
      await interaction.reply(
        "An error occurred while fetching user information.",
        { ephemeral: true }
      );
    }
  },
};
