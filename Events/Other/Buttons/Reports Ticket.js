const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  async execute(interaction) {
    const isThere = interaction.guild.channels.cache.find(
      c => c.topic && c.topic.match(interaction.user.id) && c.name.match("reports"))
    if (isThere) {
      interaction.reply({ content: 'You already have a user reports ticket open.', ephemeral: true })
      await wait(30000)
      interaction.deleteReply()
      return;
    }

    const requestForm = new ModalBuilder()
      .setCustomId(interaction.customId)
      .setTitle('User Reports Form')

    const requestReason = new TextInputBuilder()
      .setCustomId('report_reason')
      .setLabel('Reason are you opening a user report ticket?')
      .setPlaceholder('User Reports Reason')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const otherTrader = new TextInputBuilder()
      .setCustomId('user')
      .setLabel(`Who's the user you are reporting?`)
      .setPlaceholder('User\'s Username + Tag or User ID')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const row1 = new ActionRowBuilder().addComponents(requestReason)
    const row2 = new ActionRowBuilder().addComponents(otherTrader)

    requestForm.addComponents(row1, row2)
    interaction.showModal(requestForm)
  }
}