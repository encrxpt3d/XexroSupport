const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { applications } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;
const createEmbed = require("../../../Modules/embed").new

module.exports = {
  async execute(interaction) {

    const member = await interaction.guild.members.fetch(interaction.user.id)

    if (!member)
      return;

    const applicationsChannel = await interaction.guild.channels.fetch(applications)
    const message = await applicationsChannel.messages.fetch({ cache: true }).then(msgs =>
      msgs.filter(msg =>
        msg.content.match(member.id)))

    if (message.content) {
      interaction.reply({ content: 'You already have a staff application open.', ephemeral: true })
      await wait(30000)
      interaction.deleteReply()
      return;
    }

    const c = await interaction.guild.channels.fetch(applications)

    const why = interaction.fields.getTextInputValue('why')
    const standsOut = interaction.fields.getTextInputValue('stands_out')
    const bring = interaction.fields.getTextInputValue('bring')
    const scenario = interaction.fields.getTextInputValue('scenario')
    const questions = interaction.fields.getTextInputValue('questions')
    
    if (questions == '' || questions == null || questions == "")
      questions = "No questions provided."

    c.send('.').then(async m => {
      m.edit({
        content: `User ID: ${interaction.user.id}`,
        embeds: [createEmbed({
          title: `${interaction.user.tag}'s Staff Application [PART. 1]`
        }), createEmbed({
          desc: `**Why should we hire** - \`${why}\`\n\n**What makes them stand out** - \`${standsOut}\`\n\n**What would they bring to the team** - \`${bring}\`\n\n**Do they know they must use grammar** - \`${scenario}\`\n\n**Questions** - \`${questions}\`\n\n`
        })]
      })

      const application = new ModalBuilder()
        .setCustomId(interaction.customId + `_${m.id}`)
        .setTitle('Staff Application Form [PART. 1]');

      const age = new TextInputBuilder()
        .setCustomId('age')
        .setLabel('How old are you?')
        .setPlaceholder('[Input Here]')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const scenario1 = new TextInputBuilder()
        .setCustomId('scenario_1')
        .setLabel('If someone is spamming, what you do?')
        .setPlaceholder('Warn | Mute + Warn | Kick | Ban')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const scenario2 = new TextInputBuilder()
        .setCustomId('scenario_2')
        .setLabel('Someone saying racial slurs, what you do?')
        .setPlaceholder('Warn | Mute + Warn | Kick | Ban')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const scenario3 = new TextInputBuilder()
        .setCustomId('scenario_3')
        .setLabel('If you abuse, will you get demoted?')
        .setPlaceholder('Yes | Nah man | Not sure')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const scenario4 = new TextInputBuilder()
        .setCustomId('scenario_4')
        .setLabel('If you disrespect staff, u get demote?')
        .setPlaceholder('Yes | Nah man | Not sure')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const row1 = new ActionRowBuilder().addComponents(age)
      const row2 = new ActionRowBuilder().addComponents(scenario1)
      const row3 = new ActionRowBuilder().addComponents(scenario2)
      const row4 = new ActionRowBuilder().addComponents(scenario3)
      const row5 = new ActionRowBuilder().addComponents(scenario4)

      application.addComponents(row1, row2, row3, row4, row5)
      interaction.showModal(application)
    })
  }
}