const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trending")
    .setDescription("View trending GitHub repositories"),

  async execute(interaction) {
    try {
      const response = await axios.get("https://github.com/trending");
      if (response.status === 200) {
        const $ = cheerio.load(response.data);
        const trendingRepos = [];

        $(".Box-row").each((index, element) => {
          if (index < 5) {
            const repoName = $(element).find("h1 a").text().trim();
            const repoDescription = $(element).find("p").text().trim();
            const repoURL = `https://github.com${$(element)
              .find("a")
              .attr("href")}`;

            trendingRepos.push(
              `**Name:** ${repoName}\n**Description:** ${repoDescription}\n**URL:** ${repoURL}\n`
            );
          }
        });

        if (trendingRepos.length === 0) {
          await interaction.reply("No trending repositories found.", {
            ephemeral: true,
          });
        } else {
          const message = trendingRepos.join("\n");

          await interaction.reply(message, { ephemeral: true });
        }
      } else {
        await interaction.reply("Failed to fetch trending repositories.", {
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "An error occurred while fetching trending repositories.",
        { ephemeral: true }
      );
    }
  },
};
