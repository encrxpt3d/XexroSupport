const { Events, ActivityType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { guildName, guildId, selfRoles } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    client.user.setActivity(guildName, { type: ActivityType.Watching });
    console.log(`[BOT]: Online`)

    /* - Xexrö ツ Community - Rules
    const embed = createEmbed({
      title: `Rules - Xexrö ツ Community`,
      desc: `**These rules will apply to every text channel and voice channel in the server.**\n\n**__Make sure to also check out Discord's TOS and Guidelines!__**\n\nhttps://discord.com/terms \nhttps://discord.com/guidelines \n\n-`,
      footer: { text: `React to the ✅ below to show that you have read and understood the rules.` }
    })

    embed.addFields(
      { name: 'ᕗ Rule. 1', value: `Make sure to be civil and respectful to everyone in the server. Do not bring up any sensitive topics.\n` },
      { name: 'ᕗ Rule. 2', value: `Do not post any NSFW, pornographic, gore, suggestive or explicit content anywhere in the server.\n` },
      { name: 'ᕗ Rule. 3', value: `Do not spam in channels, this includes things such as texts, emojis, and copypastas.\n` },
      { name: 'ᕗ Rule. 4', value: `Do not abuse or spam pings, simply ping a person once and wait for their response.\n` },
      { name: 'ᕗ Rule. 5', value: `Trolling or trying to seek for attention by attempting to annoy people in chats is not allowed in the server.\n` },
      { name: 'ᕗ Rule. 6', value: `Threatening others is not allowed whatsoever, even if it is for a "joke". Joking or goofing around is perfectly fine, as long as you don't send any harmful/threatening messages to other people.\n` },
      { name: 'ᕗ Rule. 7', value: `Do not send any malicious messages/links with the intention to scam others in the server, spread false rumors and etc.\n` },
      { name: 'ᕗ Rule. 8', value: `Do not impersonate/pretend to be another person in the server.\n` },
      { name: 'ᕗ Rule. 9', value: `No self-advertising in the server and/or in people's DMs (private messages). Crew Recruitment Posts are allowed, but should only be posted in the crew-recruitment channel and not advertised anywhere else.\n` },
      { name: 'ᕗ Rule. 10', value: `Do not repeatedly beg for stuff such as in-game cash, gift cards, etc.\n` },
      { name: 'ᕗ Rule. 11', value: `No alternate accounts allowed, as alternate accounts can be used to bypass mutes/bans and also join giveaways.\n` },
      { name: 'ᕗ Rule. 12', value: `Make sure to use the right category/channel that fits the topic of the said discussion.\n` },
      { name: 'ᕗ Rule. 13', value: `Do not discuss about anything that violates Zynga/NaturalMotion's Terms of Service and Guidelines and possibly get banned for.\n` },
      { name: 'ᕗ Rule. 14', value: `Any political topics of any kind are not allowed to be discussed here in the server or in any channel at all (even if you have good intentions) as it may start heated arguments, false rumors being spread in the server and etc.\n` },
      { name: 'ᕗ Rule. 15', value: `Finally, use common sense. If you think your message may violate any one of these rules and will get you in trouble, then don't post it.\n` }
    )

    client.channels.fetch('1059285168554258483').then(c => {
      c.send({
        content: '||@everyone||',
        embeds: [embed]
      }).then(m => m.react('✅'))
    })
    */

    /*
    const embed2 = createEmbed({
      title: `Self Roles -  Xexrö ツ Community`,
      desc: `**React to the following emojis to get your specified ping role!**\n\n🎉: <@&1060770200770842684>\n⚔️: <@&1060770201081229323>`,
      footer: { text: `Lightstrap#0658` }
    })

    client.channels.fetch(selfRoles).then(c => {
      c.send({
        content: '||@everyone||',
        embeds: [embed2]
      }).then(m => {
        
        m.react('🎉')
        m.react('⚔️')
      })
    })
    */
  }
}