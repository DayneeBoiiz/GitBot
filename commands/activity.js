const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("activity")
    .setDescription("Displays a user's recent GitHub activity"),
  async execute(interaction) {
    try {
      const username = interaction.options.getString("username");

      const response = await axios.get(
        `https://api.github.com/users/${username}/events/public`
      );

      if (response.status === 200) {
        const activityEvents = response.data;

        if (activityEvents.length === 0) {
          const embed = new EmbedBuilder()
            .setColor("#FF5733")
            .setDescription("No recent GitHub activity for this user.");

          await interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const recentActivity = activityEvents
            .map((event) => {
              let eventMessage = "";
              if (event.type === "PushEvent") {
                eventMessage = `Pushed to repository ${event.repo.name}`;
              } else if (event.type === "PullRequestEvent") {
                eventMessage = `Created a pull request in repository ${event.repo.name}`;
              } else if (event.type === "IssuesEvent") {
                eventMessage = `Opened an issue in repository ${event.repo.name}`;
              }
              return `**Event Type:** ${eventMessage}\n**Timestamp:** ${new Date(
                event.created_at
              ).toLocaleString()}`;
            })
            .join("\n\n");

          const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle(`${username}'s Recent GitHub Activity`)
            .setDescription(recentActivity);

          await interaction.reply({ embeds: [embed], ephemeral: true });
        }
      } else {
        const embed = new EmbedBuilder()
          .setColor("#FF5733")
          .setDescription("Failed to fetch the user's GitHub activity.");

        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.log(error.message);
      const embed = new EmbedBuilder()
        .setColor("#FF5733")
        .setDescription(
          "An error occurred while fetching the user's GitHub activity."
        );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
