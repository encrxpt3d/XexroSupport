const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { applications } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;
const createEmbed = require("../../../Modules/embed").new

module.exports = {
  async execute(interaction) {
    const messageId = interaction.customId.replace("_Deny", "")

    const applicationsChannel = await interaction.guild.channels.fetch(applications)
    const message = await applicationsChannel.messages.cache.get(messageId)

    if (message == null || message == undefined)
      return console.log("No message found.");

    const e1 = EmbedBuilder.from(message.embeds[0])
    const e2 = EmbedBuilder.from(message.embeds[1])
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(interaction.customId.replace("_Deny") + "_Denied")
        .setDisabled(true)
        .setLabel("Denied")
        .setStyle(ButtonStyle.Danger),
      );

    message.edit({
      components: [row],
      embeds: [createEmbed({
        title: `[DENIED] ${e1.data.title}`,
        color: 'ff3131'
      }), createEmbed({
        desc: e2.data.description,
        color: 'ff3131'
      })]
    })

    await interaction.reply({
      ephemeral: true,
      content: 'Successfully denied application.',
      fetchReply: true
    })
    await wait(15000)
    interaction.deleteReply()
  }
}