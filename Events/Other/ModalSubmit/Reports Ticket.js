const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { staffRole, ticketsCategory } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;
const createEmbed = require("../../../Modules/embed").new

module.exports = {
  execute(interaction) {
    const isThere = interaction.guild.channels.cache.find(
      c => c.name.match(interaction.user.username.toLowerCase())) && c.name.match('reports')
    if (isThere) {
      return interaction.reply({ content: 'You already have a user reports ticket open.', ephemeral: true })
    }

    const category = interaction.guild.channels.cache.find(c => c.id == ticketsCategory && c.type == 4)

    interaction.guild.channels.create({
      name: `〘❔〙${interaction.user.username} reports ticket`,
      type: 0,
      topic: 'User Reports Ticket by: ' + interaction.user.id,
      parent: category,
      permissionOverwrites: [
        {
          id: interaction.guild.id, // deny everyone to see
          deny: 'ViewChannel'
        },
        {
          id: staffRole,
          allow: 'ViewChannel'
        },
        {
          id: interaction.user.id, // allows user to see
          allow: 'ViewChannel'
        }
      ]
    }).then(c => {

      const reportReason = interaction.fields.getTextInputValue('report_reason')
      const reportedUser = interaction.fields.getTextInputValue('user')

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(interaction.user.id + '_Close')
            .setLabel("Close 📩")
            .setStyle(ButtonStyle.Secondary),
        );

      c.send({
        embeds: [createEmbed({
          title: `${interaction.user.username}'s User Report Ticket`,
          footer: { text: 'To close this ticket, click the close button below.' }
        }), createEmbed({
          desc: `Report Reason: \`${reportReason}\`\nReported User: \`${reportedUser}\``
        })],
        content: `Thanks for using our services, <@${interaction.user.id}>! A member of the <@&${staffRole}> team will get to you shortly.`,
        components: [row]
      }).then(async m => {
        m.pin()
        interaction.reply({
          ephemeral: true,
          content: `Your user reports ticket has been opened in <#${c.id}>.`,
          fetchReply: true
        })
        await wait(30000)
        interaction.deleteReply()
      })
    })
  }
}