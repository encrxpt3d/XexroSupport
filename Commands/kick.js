const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const createEmbed = require("../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)

    .addUserOption(option => option
      .setName('user')
      .setDescription('The user to kick.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('reason')
      .setDescription('The reason for the kick.'))

    .addBooleanOption(option => option
      .setName('should_dm')
      .setDescription('Whether to dm the user before the kick or not.'))

  , async execute(interaction) {
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason') ?? "No reason provided."
    const shouldDm = interaction.options.getBoolean('should_dm')

    if (user.id == interaction.user.id)
      return interaction.reply('You cannot kick yourself!')

    const kickOptions = {}
    kickOptions.reason = reason

    if (shouldDm) {
      await user.createDM({ force: true })
      user.send({
        embeds: [createEmbed({
          title: 'Kick Message',
          desc: `You have been kicked from ${interaction.guild.name}.\nReason: \`${reason}\``,
          color: 'd5cc4d',
          timestamp: true,
          footer: { text: interaction.client.user.tag, iconURL: interaction.client.user.displayAvatarURL() }
        })]
      })
    }

    interaction.guild.members.kick(user, kickOptions)
      .then(() => {
        interaction.reply({
          embeds: [createEmbed({
            title: `Successfully Kicked <@${user.id}>`,
            desc: `Reason: \`${reason}\``,
            color: 'd5cc4d'
          })]
        })
      }).catch(e => {
        console.log(e)
      })
  }
}

