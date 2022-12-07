const { Events } = require('discord.js')
const { clientId, giveawaysPing, gpoHubPerms, mmHubPerms } = require("../../config.json")

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
    case "🦀":
      role = gpoHubPerms
      break;
    case "🔄":
      role = mmHubPerms
      break;
  }

  if (member.roles.cache.get(role)) {
    member.roles.remove(role)

    await user.createDM({ force: true })
    const Role = guild.roles.cache.get(role)

    user.send({ content: `Successfully removed role: **${Role.name}**` })
  }
}

module.exports = {
  name: Events.MessageReactionRemove,
  execute(messageReaction, user) {
    run(messageReaction, user)
  }
}