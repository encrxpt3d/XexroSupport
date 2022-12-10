const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")
const { applications } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;
const createEmbed = require("../../../Modules/embed").new

module.exports = {
  async execute(interaction) {
    const messageId = interaction.customId.replace("_Approve", "")

    const applicationsChannel = await interaction.guild.channels.fetch(applications)
    const message = await applicationsChannel.messages.cache.get(messageId)

    if (message == null || message == undefined)
      return console.log("No message found.");

    const e1 = EmbedBuilder.from(message.embeds[0])
    const e2 = EmbedBuilder.from(message.embeds[1])

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(interaction.customId.replace("_Approve") + "_Approved")
        .setDisabled(true)
        .setLabel("Approved")
        .setStyle(ButtonStyle.Success),
      );

    message.edit({
      components: [row],
      embeds: [createEmbed({
        title: `[APPROVED] ${e1.data.title}`,
        color: '0fff84'
      }), createEmbed({
        desc: e2.data.description,
        color: '0fff84'
      })]
    })

    await interaction.reply({
      ephemeral: true,
      content: 'Successfully approved application.',
      fetchReply: true
    })
    await wait(15000)
    interaction.deleteReply()
  }
}