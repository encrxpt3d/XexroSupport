const { Events, EmbedBuilder, ActivityType } = require('discord.js')
const { guildName, guildId } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setActivity(guildName, { type: ActivityType.Watching });
    console.log(`[BOT]: Online`)

    /* - Serenity - Rules
    const embed = await createEmbed({
      title: `Rules - Serenity`,
      desc: `**These rules will apply to every text channel and voice channel in the server.**\n\n**__Make sure to also check out Discord's TOS and Guidelines!__**\n\nhttps://discord.com/terms \nhttps://discord.com/guidelines \n\n`,
      footer: {text: `React to the ✅ below to show that you have read and understood the rules.`}
    })

    embed.addFields(
      { name: 'ᕗ Rule. 1', value: `Make sure to be civil and respectful to everyone in the server. Do not bring up any sensitive topics.` },
      { name: 'ᕗ Rule. 2', value: `Do not post any NSFW, pornographic, gore, suggestive or explicit content anywhere in the server.` },
      { name: 'ᕗ Rule. 3', value: `Do not spam in channels, this includes things such as texts, emojis, and copypastas.` },
      { name: 'ᕗ Rule. 4', value: `Do not abuse or spam pings, simply ping a person once and wait for their response.` },
      { name: 'ᕗ Rule. 5', value: `Trolling or trying to seek for attention by attempting to annoy people in chats is not allowed in the server.` },
      { name: 'ᕗ Rule. 6', value: `Threatening others is not allowed whatsoever, even if it is for a "joke". Joking or goofing around is perfectly fine, as long as you don't send any harmful/threatening messages to other people.` },
      { name: 'ᕗ Rule. 7', value: `Do not send any malicious messages/links with the intention to scam others in the server, spread false rumors and etc.` },
      { name: 'ᕗ Rule. 8', value: `Do not impersonate/pretend to be another person in the server.` },
      { name: 'ᕗ Rule. 9', value: `No self-advertising in the server and/or in people's DMs (private messages). Crew Recruitment Posts are allowed, but should only be posted in the crew-recruitment channel and not advertised anywhere else.` },
      { name: 'ᕗ Rule. 10', value: `Do not repeatedly beg for stuff such as in-game cash, gift cards, etc.` },
      { name: 'ᕗ Rule. 11', value: `No alternate accounts allowed, as alternate accounts can be used to bypass mutes/bans and also join giveaways.` },
      { name: 'ᕗ Rule. 12', value: `Make sure to use the right category/channel that fits the topic of the said discussion.` },
      { name: 'ᕗ Rule. 13', value: `Do not discuss about anything that violates Zynga/NaturalMotion's Terms of Service and Guidelines such as hacks, cheats, and glitches that players could take advantage of for their own personal gain and possibly get banned for.` },
      { name: 'ᕗ Rule. 14', value: `Any political topics of any kind are not allowed to be discussed here in the server or in any channel at all (even if you have good intentions) as it may start heated arguments, false rumors being spread in the server and etc.` },
      { name: 'ᕗ Rule. 15', value: `Finally, use common sense. If you think your message may violate any one of these rules and will get you in trouble, then don't post it.` }
    )

    client.channels.fetch('1050620452931903578').then(c => {
      c.send({
        content: '||@everyone||',
        embeds: [embed]
      }).then(m => m.react('✅'))
    })
    */
  }
}