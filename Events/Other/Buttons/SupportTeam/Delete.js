const { staffRole } = require("../../../../config.json")

module.exports = {
  execute(interaction) {
    const member = interaction.guild.members.cache.find(
      u => u.id == interaction.user.id)

    if (member) {
      if (member.roles.cache.some(role => role.id == staffRole)) {
        interaction.channel.delete()
      } else {
        interaction.reply({ ephemeral: true, content: 'You aren\'t good enough to use this command.' })
      }
    }
  }
}