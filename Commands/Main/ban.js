const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

    .addUserOption(option => option
      .setName('user')
      .setDescription('The user to ban.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('reason')
      .setDescription('The reason for the ban.'))

    .addBooleanOption(option => option
      .setName('should_dm')
      .setDescription('Whether to dm the user before the ban or not.'))

    .addBooleanOption(option => option
      .setName('preserve_messages')
      .setDescription('Whether to delete the user\'s messages or not.'))

  , async execute(interaction) {
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason') ?? "No reason provided."
    const shouldDm = interaction.options.getBoolean('should_dm')
    const shouldPreserveMessages = interaction.options.getBoolean('preserve_messages')

    if (user.id == interaction.user.id)
      return interaction.reply('You cannot ban yourself!')

    const banOptions = {}
    banOptions.reason = reason

    if (shouldDm) {
      await user.createDM({ force: true })
      user.send({
        embeds: [createEmbed({
          title: 'Ban Message',
          desc: `You have been banned from ${interaction.guild.name}.\nReason: \`${reason}\``,
          color: 'd5cc4d',
          timestamp: true,
          footer: { text: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() }
        })]
      })
    }

    if (!shouldPreserveMessages || shouldPreserveMessages == false) {
      banOptions.deleteMessageSeconds = 604800
    }

    interaction.guild.members.ban(user, banOptions)
      .then(() => {
        interaction.reply({
          embeds: [createEmbed({
            title: `Succcessfully Banned <@${user.id}>`,
            desc: `Reason: \`${reason}\``,
            color: 'd5cc4d'
          })]
        })
      }).catch(e => {
        console.log(e)
      })
  }
}