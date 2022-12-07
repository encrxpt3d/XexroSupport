const { Events, EmbedBuilder } = require('discord.js')
const { memberLogs, selfRoles, unverifiedRole, pingsRole, permsRole } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.GuildMemberAdd,
  execute(member) {
    member.roles.add([unverifiedRole, pingsRole, permsRole])
    member.guild.channels.cache.find(c => c.id == memberLogs).send({
      embeds: [createEmbed({
        title: `${member.user.tag} Joined`,
        desc: `<@${member.id}> joined **${member.guild.name}**.`
      })]
    })
  }
}