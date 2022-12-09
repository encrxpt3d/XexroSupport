const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CollectorUtils } = require('discord.js-collector-utils');
const { gpoHubPerms, mmHubPerms } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('permroles')
    .setDescription('Creates perm roles.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

  , async execute(interaction) {

    const msg = await interaction.channel.send({
      content: '||@everyone||',
      embeds: [createEmbed({
        title: "Perm Roles",
        desc: `React to the following emojis to get the perms you want.\n\n🦀 GPO Hub Perms <@&${gpoHubPerms}>\n🔄 MM Hub Perms <@&${mmHubPerms}>`
      })],
      fetchReply: true
    })

    await msg.react('🦀')
    await msg.react('🔄')

    const newMsg = await interaction.reply({
      ephemeral: true,
      content: 'Successfully created perm roles.',
      fetchReply: true
    })

    const wait = require('node:timers/promises').setTimeout;
    await wait(30000)
    if (newMsg)
      newMsg.deleteReply();
  }
}