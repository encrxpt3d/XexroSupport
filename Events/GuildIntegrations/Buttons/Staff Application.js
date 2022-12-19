const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js')
const { applications } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;

module.exports = {
  async execute(interaction) {
    const member = await interaction.guild.members.fetch(interaction.user.id)

    if (!member)
      return;
    
    const applicationsChannel = await interaction.guild.channels.fetch(applications)
    const foundApplicationMessage = await applicationsChannel.messages.fetch({ cache: true }).then(msgs =>
      msgs.filter(msg =>
        msg.content.match(member.id)))

    if (foundApplicationMessage.content) {
      interaction.reply({ content: 'You already have a staff application open.', ephemeral: true })
      await wait(30000)
      interaction.deleteReply()
      return;
    }

    const application = new ModalBuilder()
      .setCustomId(interaction.customId)
      .setTitle('Staff Application Form [PART 1]')

    const why = new TextInputBuilder()
      .setCustomId('why')
      .setLabel('Why should we hire you?')
      .setPlaceholder('[Input Here]')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const standsOut = new TextInputBuilder()
      .setCustomId('stands_out')
      .setLabel('What makes you stand out from the others?')
      .setPlaceholder('[Input Here]')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const bring = new TextInputBuilder()
      .setCustomId('bring')
      .setLabel(`What would you bring to the team?`)
      .setPlaceholder('[Input Here]')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const scenario = new TextInputBuilder()
      .setCustomId('scenario')
      .setLabel('Do you know that you must use grammar?')
      .setPlaceholder('Yes | nu yi fa r t | no xd | noob')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const questions = new TextInputBuilder()
      .setCustomId('questions')
      .setLabel('Any more questions? (Optional)')
      .setPlaceholder('[Input Here]')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const row1 = new ActionRowBuilder().addComponents(why)
    const row2 = new ActionRowBuilder().addComponents(standsOut)
    const row3 = new ActionRowBuilder().addComponents(bring)
    const row4 = new ActionRowBuilder().addComponents(scenario)
    const row5 = new ActionRowBuilder().addComponents(questions)

    application.addComponents(row1, row2, row3, row4, row5)
    interaction.showModal(application)
  }
}