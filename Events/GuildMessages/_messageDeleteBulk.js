const { Events, AuditLogEvent } = require('discord.js')
const { clientId, chatLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.MessageDeleteBulk,
  async execute(message) {

    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MessageBulkDelete
    });

    const log = fetchedLogs.entries.first();
    if (!log) return;
    
    const { executor, target } = log;

    if (target.id != message.author.id)
      return;

    message.guild.channels.fetch(chatLogs).then(c => {
      c.send({
        embeds: [createEmbed({
          title: "Message Bulk Delete",
          desc: `Executor: ${executor}`,
          footer: {text: executor.tag, iconURL: executor.displayAvatarURL()}
        })]
      })
    })
  }
}