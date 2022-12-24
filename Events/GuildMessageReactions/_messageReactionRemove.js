const { Events } = require('discord.js')
const { clientId, selfRoles, giveawaysPing } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

async function run(reaction, user) {
  try {
    await reaction.fetch();
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    return;
  }

  if (user.id == clientId)
    return;

  const guild = reaction.message.guild
  const member = guild.members.cache.get(user.id)

  let role;

  switch (reaction.emoji.name) {
    case "🎉":
      if (reaction.message.channel.id == selfRoles)
        role = giveawaysPing;
        else
        return;
      break;
    default:
      break;
  }

  if (member.roles.cache.has(role)) {
    member.roles.remove(role)

    await user.createDM({ force: true })
    const Role = guild.roles.cache.get(role)

    user.send({
      embeds: [createEmbed({
        desc: `Successfully removed role: **${Role.name}**`
      })]
    })
  }
}

module.exports = {
  name: Events.MessageReactionRemove,
  execute(messageReaction, user) {
    run(messageReaction, user)
  }
}