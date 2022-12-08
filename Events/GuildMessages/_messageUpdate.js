const { Events } = require('discord.js')
const { clientId, chatLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {

    if (newMessage.author.id == clientId)
      return;

    newMessage.guild.channels.fetch(chatLogs).then(c => {
      c.send({
        embeds: [createEmbed({
          title: "Message Edited",
          desc: `Old Message: \`${oldMessage.content}\`\nNew Message: \`${newMessage.content}\``,
          footer: {text: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL()}
        })]
      })
    })
  }
}