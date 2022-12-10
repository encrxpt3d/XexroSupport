const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

const { giveawaysPing, gamenightPing, crPing, wosPing, carryPing, bfgPing } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('selfroles')
    .setDescription('Creates self roles.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

  , async execute(interaction) {

    const msg = await interaction.channel.send({
      content: '||@everyone||',
      embeds: [createEmbed({
        title: "Self Roles",
        desc: `React to the following emojis to get the roles you want.\n\n🎉 Giveaway Ping <@&${giveawaysPing}>\n🎮 Gamenight Ping <@&${gamenightPing}>\n💬 Chat Revive Ping <@&${crPing}>\n🇱 Wall of Shame Ping <@&${wosPing}>\n💸 Carry Ping <@&${carryPing}>\n🥳 BF Giveaway Ping <@&${bfgPing}>`
      })],
      fetchReply: true
    })

    await msg.react('🎉')
    await msg.react('🎮')
    await msg.react('💬')
    await msg.react('🇱')
    await msg.react('💸')
    await msg.react('🥳')

    interaction.reply({
      ephemeral: true,
      content: 'Successfully created self roles.'
    })
  }
}