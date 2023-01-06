const { Events } = require('discord.js')
const { clientId, selfRoles, colorsRole, red, orange, yellow, green, blue, purple, pink } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

const colors = {
  ymc_red: red,
  ymc_orange: orange,
  ymc_yellow: yellow,
  ymc_green: green,
  ymc_blue: blue,
  ymc_purple: purple,
  ymc_pink: pink
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

    await messageReaction.message.reactions.cache.forEach(reaction => {
      if (reaction.name != messageReaction.name)
        reaction.users.remove(user)
    })

    let role = null;
    let noRole = false;

    role = colors[messageReaction.emoji.name] ?? null

    if (role == null)
      noRole = true

    if (member.roles.cache.has(role) && noRole == false) {
      try {
        await member.roles.cache.forEach(r => {
          if (r.name.match('YMC-'))
            member.roles.remove(r)
        })
        
        member.roles.remove(colorsRole)

        await user.createDM({ force: true })
        const Role = guild.roles.cache.get(role)

        user.send({
          embeds: [createEmbed({
            desc: `Successfully removed role: **${Role.name}**`
          })]
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}