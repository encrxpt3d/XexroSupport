const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CollectorUtils } = require('discord.js-collector-utils');

const { giveawaysPing } = require("../config.json")

const createEmbed = require("../Modules/embed.js").new

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
        desc: `React to the following emojis to get the roles you want.\n\n🎉 Giveaway Ping <@&${giveawaysPing}>`
      })],
      fetchReply: true
    })

    await msg.react('🎉')

    interaction.reply({
      ephemeral: true,
      content: 'Successfully created self roles.'
    })
  }
}