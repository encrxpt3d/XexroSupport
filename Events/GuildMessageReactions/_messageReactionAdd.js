const { Events } = require('discord.js')
const { clientId, selfRoles, giveawaysPing } = require("../../config.json")

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
      case "🎉":
        if (messageReaction.message.channel.id == selfRoles)
          role = giveawaysPing;
        else
          return;
        break;
      default:
        noRole = true;
        break;
    }

    if (noRole == false) {
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