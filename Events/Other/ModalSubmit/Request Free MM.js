const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { juniorMM, seniorMM, ticketsCategory } = require("../../../config.json")

const createEmbed = require("../../../Modules/embed").new
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  execute(interaction) {
    const isThere = interaction.guild.channels.cache.find(
      c => c.name.match(interaction.user.username.toLowerCase())) && c.name.match('free')
    if (isThere) {
      return interaction.reply({ content: 'You already have a request ticket open.', ephemeral: true })
    }

    const category = interaction.guild.channels.cache.find(c => c.id == ticketsCategory && c.type == 4)

    interaction.guild.channels.create({
      name: `〘❔〙${interaction.user.username} free mm request`,
      type: 0,
      topic: 'Free MM Request by: ' + interaction.user.id,
      parent: category,
      permissionOverwrites: [
        {
          id: interaction.guild.id, // deny everyone to see
          deny: 'ViewChannel'
        },
        {
          id: juniorMM,
          allow: 'ViewChannel'
        },
        {
          id: seniorMM,
          allow: 'ViewChannel'
        },
        {
          id: interaction.user.id, // allows user to see
          allow: 'ViewChannel'
        }
      ]
    }).then(c => {

      const requestReason = interaction.fields.getTextInputValue('request_reason')
      const otherTrader = interaction.fields.getTextInputValue('other_trader')

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(interaction.user.id + '_Close')
            .setLabel("Close 📩")
            .setStyle(ButtonStyle.Secondary),
        );

      c.send({
        embeds: [createEmbed({
          title: `${interaction.user.username}'s Free MM Request`,
          footer: { text: 'To close this ticket, click the close button below.' }
        }), createEmbed({
          desc: `Request: \`${requestReason}\`\nOther Trader: \`${otherTrader}\``
        })],
        content: `Thanks for using our services, <@${interaction.user.id}>! A member of the <@&${juniorMM}> or <@&${seniorMM}> team will get to you shortly.`,
        components: [row]
      }).then(async m => {
        m.pin()
        interaction.reply({
          ephemeral: true,
          content: `Your free MM request ticket has been opened in <#${c.id}>.`,
          fetchReply: true
        })
        await wait(30000)
        interaction.deleteReply()
      })
    })
  }
}