const { Events } = require('discord.js')
const { clientId, giveawaysPing, gamenightPing, crPing, wosPing, carryPing, bfgPing } = require("../../config.json")

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
  }

  if (member.roles.cache.has(role)) {
    member.roles.remove(role)

    await user.createDM({ force: true })
    const Role = guild.roles.cache.get(role)

    user.send({
      embeds: [createEmbed({
        desc: `Successfully added role: **${Role.name}**`
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