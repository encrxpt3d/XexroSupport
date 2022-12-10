const { Events } = require('discord.js')
const { clientId, selfRoles, unverifiedRole, memberRole, giveawaysPing, gamenightPing, crPing, wosPing, carryPing, bfgPing } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.MessageReactionAdd,
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

    switch (messageReaction.emoji.name) {
      case "✅":
        role = memberRole
        if (messageReaction.message.channel.id != '1050673943708708954')
          return;

        if (member.roles.cache.has(memberRole))
          return;

        await member.roles.remove(unverifiedRole)
        await member.roles.add(memberRole)

        await user.createDM({ force: true })
        user.send({
          embeds: [createEmbed({
            desc: `Successfully verified in **${guild.name}**!\n\n> Visit <#${selfRoles}> to get you started!`
          })]
        })
        noRole = true
        break;
      case "🎉":
        role = giveawaysPing
        break;
      case "🎮":
        role = gamenightPing
        break;
      case "💬":
        role = crPing
        break;
      case "🇱":
        role = wosPing
        break;
      case "💸":
        role = carryPing
        break;
      case "🥳":
        role = bfgPing
        break;
      default:
        noRole = true;
        break;
    }

    if (noRole == false && role != memberRole) {
      try {
        member.roles.add(role)
        await user.createDM({ force: true })
        const Role = guild.roles.cache.get(role)

        user.send({
          embeds: [createEmbed({
            desc: `Successfully added role: **${Role.name}**`
          })]
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}