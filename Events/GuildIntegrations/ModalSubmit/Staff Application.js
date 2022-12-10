const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
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
    const questions = interaction.fields.getTextInputValue('questions') ?? 'No questions.'

    c.send('.').then(async m => {
      const row1 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(m.id + '_Approve')
            .setLabel("Approve - ✅")
            .setStyle(ButtonStyle.Success),
        );

      const row2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(m.id + '_Deny')
            .setLabel("Deny - ❌")
            .setStyle(ButtonStyle.Danger),
        );
      m.edit({
        content: '',
        embeds: [createEmbed({
          title: `${interaction.user}'s Staff Application`
        }), createEmbed({
          desc: `**Why should we hire** - \`${why}\`\n\n**What makes you stand out** - \`${standsOut}\`\n\n**What would you bring to the team** - \`${bring}\`\n\n**Do they know they must use grammar** - \`${scenario}\`\n\n**Questions** - \`${questions ?? 'None provided.'}\`\n\n`
        })],
        components: [row1, row2]
      })
      interaction.reply({
        ephemeral: true,
        content: `Your staff application has been recorded.`,
        fetchReply: true
      })
      await wait(30000)
      interaction.deleteReply()
    })
  }
}