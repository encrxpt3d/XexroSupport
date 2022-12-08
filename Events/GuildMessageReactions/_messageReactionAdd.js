const { Events } = require('discord.js')
const { clientId, giveawaysPing, gpoHubPerms, mmHubPerms } = require("../../config.json")

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

    let role;

    switch (messageReaction.emoji.name) {
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

    if (!member.roles.cache.get(role)) {
      member.roles.add(role)

      await user.createDM({ force: true })
      const Role = guild.roles.cache.get(role)

      user.send({ content: `Successfully added role: **${Role.name}**` })
    }
  }
}