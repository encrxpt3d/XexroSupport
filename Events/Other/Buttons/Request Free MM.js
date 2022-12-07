const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  async execute(interaction) {
    const isThere = interaction.guild.channels.cache.find(
      c => c.topic && c.topic.match(interaction.user.id) && c.name.match("free"))
    if (isThere) {
      interaction.reply({ content: 'You already have a request ticket open.', ephemeral: true })
      await wait(30000)
      interaction.deleteReply()
      return;
    }

    const requestForm = new ModalBuilder()
      .setCustomId(interaction.customId)
      .setTitle('Request Free MM Form')

    const requestReason = new TextInputBuilder()
      .setCustomId('request_reason')
      .setLabel('What do you need a free middleman for?')
      .setPlaceholder('Free Middleman Request Reason')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const otherTrader = new TextInputBuilder()
      .setCustomId('other_trader')
      .setLabel(`Who's the other trader?`)
      .setPlaceholder('Other Trader\'s Username + Tag or User ID')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    
    const row1 = new ActionRowBuilder().addComponents(requestReason)
    const row2 = new ActionRowBuilder().addComponents(otherTrader)

    requestForm.addComponents(row1, row2)
    interaction.showModal(requestForm)
  }
}