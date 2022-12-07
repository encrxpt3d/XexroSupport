const { staffRole } = require("../../../../config.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  async execute(interaction) {
    const member = interaction.guild.members.cache.find(
      u => u.id == interaction.user.id)

    const ticketMember = interaction.guild.members.cache.find(
      u => interaction.channel.topic.match(u.id))

    if (member && ticketMember) {
      if (member.roles.cache.some(role => role.id == staffRole)) {
        interaction.channel.permissionOverwrites.edit(ticketMember.user.id, {
          'ViewChannel': true
        })
        interaction.update({ embeds: [], components: [], content: 'Successfully opened the ticket.', ephemeral: true })
        await wait(5000)
        interaction.deleteReply()
      } else {
        const newMsg = interaction.reply({
          ephemeral: true,
          content: 'You aren\'t good enough to use this command.',
          fetchReply: true
        })
        const wait = require('node:timers/promises').setTimeout;
        await wait(10000)
        if (newMsg)
          newMsg.deleteReply()
      }
    }
  }
}