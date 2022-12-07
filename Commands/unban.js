const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

const createEmbed = require("../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unbans a user with their user id.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)

    .addStringOption(option => option
      .setName('user_id')
      .setDescription('The ID of the user to unban.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('reason')
      .setDescription('The reason for the unban.'))

  , async execute(interaction) {
    const id = interaction.options.getString('user_id')
    const reason = interaction.options.getString('reason') ?? 'No reason provided.'

    if (id == interaction.user.id)
      return interaction.reply('You cannot unban yourself!')

    interaction.guild.members.unban(id, { reason: reason })
      .then(() => {
        interaction.reply({
          embeds: [createEmbed({
            title: `Successfully Unbanned <@${id}>`,
            desc: `Reason: \`${reason}\``,
            color: 'd5cc4d'
          })]
        })

        const channel = interaction.guild.channels.cache.get('1047765103849779240')
        channel.send({
          embeds: [createEmbed({
            title: `${id} Unbanned`,
            desc: `A user with the ID of **${id}** has been unbanned by <@${interaction.user.id}> with reason: \`${reason}\``
          })]
        })
      }).catch(e => {
        if (e) {
          console.log(e)
          return interaction.reply('There was an issue unbanning the specified user.')
        }
      })
  }
}