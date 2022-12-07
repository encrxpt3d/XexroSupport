const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const createEmbed = require("../../../../Modules/embed.js").new

module.exports = {
  execute(interaction) {
    const member = interaction.guild.members.cache.find(
      u => u.id == interaction.user.id)

    const ticketMember = interaction.guild.members.cache.find(
      u => interaction.channel.topic.match(u.id))

    if (member && ticketMember) {
      interaction.channel.permissionOverwrites.edit(ticketMember.user.id, {
          'ViewChannel': false
        }).then(() => {
          interaction.reply({ content: 'Successfully closed the ticket.', ephemeral: true })
          const row = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId(ticketMember.user.id + '_Open')
                .setLabel("Open 📩")
                .setStyle(ButtonStyle.Secondary),

              new ButtonBuilder()
                .setCustomId(ticketMember.user.id + '_Delete')
                .setLabel("Delete 📩")
                .setStyle(ButtonStyle.Danger)
            );

          interaction.channel.send({
            components: [row],
            embeds: [createEmbed({
              title: 'Ticket was closed.',
              desc: `Support Team Controls`
            })]
          })
        })
    }
  }
}