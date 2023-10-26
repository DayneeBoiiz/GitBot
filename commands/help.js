const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays a comprehensive list of available commands"),
  async execute(interaction) {
    const commandList = interaction.client.commands;

    const helpEmbed = {
      title: "GitBot Command List",
      description: "Here are the available commands:",
      fields: [],
      color: 0x3498db,
    };

    commandList.forEach((command) => {
      helpEmbed.fields.push({
        name: `**/${command.data.name}**`,
        value: command.data.description,
      });
    });

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  },
};
