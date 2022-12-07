const { Events, EmbedBuilder, ActivityType } = require('discord.js')
const { guildName } = require("../../config.json")
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    client.user.setActivity(guildName, { type: ActivityType.Watching });
    console.log(`[BOT]: Online`)
  }
}