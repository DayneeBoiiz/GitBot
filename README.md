<div align="start">
  <img src="./public/discord-icon.png" width="100" height="100" alt="Discord">
</div>

# GitBot

GitBot is your trusty sidekick for all things GitHub within your Discord server. Whether you're a developer, a project manager, or simply someone interested in tracking GitHub repositories, GitBot has got you covered. This versatile bot streamlines GitHub-related tasks and keeps your community informed.

### Commands

1. **Trending Repositories**

   - `/trending`: Get a list of trending GitHub repositories.

2. **View Repository**

   - `/viewrepo`: View information about a GitHub repository
   - Options:
     - `repository`: GitHub repository name (required).

3. **Search for Issues**

   - `/searchissues`: Search for issues in a GitHub repository
   - Options:
     - `repository`: GitHub repository name (required).
     - `keyword`: Keyword to search for in issues (required).

4. **User Information**

   - `/userinfo`: Display information about a GitHub user
   - Options:
     - `username`: GitHub username (required).

5. **Create a New Issue**

   - `/createissue`: Create a new issue in a GitHub repository
   - Options:
     - `repository`: GitHub repository name (required).
     - `title`: Issue title (required).
     - `description`: Issue description (required).

6. **List User Repositories**

   - `/userrepos`: List repositories owned by a GitHub user
   - Options:
     - `username`: GitHub username (required).

7. **Recent Commits**

   - `/commits`: Show recent commits in a GitHub repository
   - Options:
     - `repository`: GitHub repository name (required).

8. **User Bio**

   - `/userbio`: Show the bio of a GitHub user
   - Options:
     - `username`: GitHub username (required).

9. **User Activity**

   - `/activity`: Display a user's recent GitHub activity
   - Options:
     - `username`: GitHub username (required).

10. **Wiki Link**

    - `/wikilink`: Generate a link to the GitHub wiki of a repository
    - Options:
      - `repository`: GitHub repository name (required).

11. **Repository Size**

    - `/reposize`: Display the size of a GitHub repository
    - Options:
      - `repository`: GitHub repository name (required).

12. **GitHub API Status**

    - `/apistatus`: Check the status of the GitHub API

13. **Help**
    - `/help`: Display a comprehensive list of available commands

## Bot Usage

To use GitBot, simply join it to your Discord server and start using the available commands. GitBot is designed to assist you with various GitHub-related tasks within your Discord community.

Before you get started, make sure to configure GitBot using your Discord Token, Client ID, Guild ID, and GitHub API Token.

### Configuration

1. Create a `config` directory in the root of your project if it doesn't already exist.
2. Inside the `config` directory, create a file named `config.js` or a similar name. You can use the following template as an example:

```json
{
  "token": "YOUR_DISCORD_TOKEN",
  "clientId": "YOUR_CLIENT_ID",
  "guildId": "YOUR_GUILD_ID",
  "GITHUB_API_TOKEN": "YOUR_GITHUB_API_TOKEN"
}
```

### Starting GitBot

- Make sure you have Node.js installed.
- Install the required dependencies using npm install.
- Start GitBot with node your_bot_file.js (replace your_bot_file.js with the actual filename of your bot script).
