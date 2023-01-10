const { Events } = require('discord.js')
const { clientId, selfRoles, giveawaysPing, dungeonCarryPing } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

const roles = {
  "🎉": giveawaysPing,
  "⚔️": dungeonCarryPing
}

module.exports = {
  name: Events.MessageReactionRemove,
  async execute(messageReaction, user) {
    try {
      await messageReaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      return;
    }

    if (user.id == clientId)
      return;

    const guild = messageReaction.message.guild
    const member = guild.members.cache.get(user.id)

    let role = null;
    let noRole = false;

    role = roles[messageReaction.emoji.name] ?? null

    if (role == null)
      noRole = true

    if (member.roles.cache.has(role) && noRole == false) {
      try {
        
        member.roles.remove(role)
        await user.createDM({ force: true })
        
        const r = guild.roles.cache.get(role)

        user.send({
          embeds: [createEmbed({
            desc: `Successfully removed role: **${r.name}**`
          })]
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}