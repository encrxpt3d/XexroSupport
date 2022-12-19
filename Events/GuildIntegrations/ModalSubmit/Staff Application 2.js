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

    console.log("Found message: " + message.content)

    const c = await interaction.guild.channels.fetch(applications)

    const age = interaction.fields.getTextInputValue('age')
    const scenario1 = interaction.fields.getTextInputValue('scenario_1')
    const scenario2 = interaction.fields.getTextInputValue('scenario_2')
    const scenario3 = interaction.fields.getTextInputValue('scenario_3')
    const scenario4 = interaction.fields.getTextInputValue('scenario_4')

    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(message.id + '_Approve')
          .setLabel("Approve - ✅")
          .setStyle(ButtonStyle.Success),
      );

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(message.id + '_Deny')
          .setLabel("Deny - ❌")
          .setStyle(ButtonStyle.Danger),
      );
    
    const e2 = EmbedBuilder.from(message.embeds[1])

    message.edit({
      content: `User ID: ${member.id}`,
      embeds: [createEmbed({
        title: `${member.user.tag}'s Staff Application [PART. 2]`
      }), createEmbed({
        desc: e2.data.description + `**Age** - ${age}\n\n**What would do when user is spamming** - \`\``
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
  }
}