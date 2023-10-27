module.exports = [
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
    name: "reposize",
    description: "Displays the size of a GitHub repository",
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
