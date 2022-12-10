const { Events } = require('discord.js')
const { unverifiedRole, pingsRole } = require("../../config.json")

module.exports = {
  name: Events.GuildMemberAdd,
  execute(member) {
    member.roles.add([unverifiedRole, pingsRole])
  }
}