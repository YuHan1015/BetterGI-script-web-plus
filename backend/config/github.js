// config/github.js
const { Octokit } = require("@octokit/rest")

module.exports = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'bettergi-scripts v1.0',
  baseUrl: 'https://api.github.com'
})