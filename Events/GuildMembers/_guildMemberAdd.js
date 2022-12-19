const { Events } = require('discord.js')
const { guildId, selfRoles, memberRole, pingsRole } = require("../../config.json")

const createEmbed = require("../../Modules/embed").new

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    member.roles.add([memberRole, pingsRole])
    await member.user.createDM({ force: true })
    member.user.send({
      embeds: [createEmbed({
        desc: `Successfully verified in **${member.guild?.name}**!\n\n> Visit <#${selfRoles}> to get you started!`
      })]
    })
  }
}