const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, clientId, guildId } = require("./config/config.json");
const fs = require("node:fs");
const path = require("node:path");

const tempCommands = [
  {
    name: "trending",
    description: "Replies with trending Repos on Github.",
  },
  {
    name: "viewrepo",
    description: "View information about a GitHub repository",
    options: [
      {
        name: "repository",
        description: "GitHub repository name",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "searchissues",
    description: "Search for issues in a GitHub repository",
    options: [
      {
        name: "repository",
        description: "GitHub repository name",
        type: 3,
        required: true,
      },
      {
        name: "keyword",
        description: "Keyword to search for in issues",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "userinfo",
    description: "Display information about a GitHub user",
    options: [
      {
        name: "username",
        description: "GitHub username",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "createissue",
    description: "Create a new issue in a GitHub repository",
    options: [
      {
        name: "repository",
        description: "GitHub repository name",
        type: 3,
        required: true,
      },
      {
        name: "title",
        description: "Issue title",
        type: 3,
        required: true,
      },
      {
        name: "description",
        description: "Issue description",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "userrepos",
    description: "List repositories owned by a GitHub user",
    options: [
      {
        name: "username",
        description: "GitHub username",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "commits",
    description: "Shows recent commits in a GitHub repository",
    options: [
      {
        name: "repository",
        description: "GitHub repository name",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "userbio",
    description: "Shows the bio of a GitHub user",
    options: [
      {
        name: "username",
        description: "Github username",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "activity",
    description: "Displays a user's recent GitHub activity",
    options: [
      {
        name: "username",
        description: "Github username",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "wikilink",
    description: "Generates a link to the GitHub wiki of a repository",
    options: [
      {
        name: "repository",
        description: "GitHub repository name",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "apistatus",
    description: "Checks the status of the GitHub API",
  },
  {
    name: "help",
    description: "Displays a comprehensive list of available commands",
  },
];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.data.name, command);
}

client.commands = commands;

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: tempCommands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);
