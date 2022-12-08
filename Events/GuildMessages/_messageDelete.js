const { Events } = require('discord.js')
const { clientId, chatLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.MessageUpdate,
  async execute(message) {

    const fetchedLogs = await oldRole.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MessageDelete
    });

    const log = fetchedLogs.entries.first();
    if (!log) return;
    
    const { executor } = log;

    newMessage.guild.channels.fetch(chatLogs).then(c => {
      c.send({
        embeds: [createEmbed({
          title: "Message Deleted",
          desc: 'Message: ' + message.content,
          footer: {text: executor.tag, iconURL: executor.displayAvatarURL()}
        })]
      })
    })
  }
}