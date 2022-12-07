const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { modLogs } = require("../config.json")

const createEmbed = require("../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes a user.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)

    .addUserOption(option => option
      .setName('user')
      .setDescription('The user to mute.')
      .setRequired(true))

    .addNumberOption(subcommand => subcommand
      .setName('duration')
      .setDescription('How long the user should stay as muted.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('type')
      .setDescription('What the duration will vary on.')
      .setRequired(true)
      .addChoices(
        { name: 'In Seconds', value: 'seconds' },
        { name: 'In Minutes', value: 'minutes' },
        { name: 'In Hours', value: 'hours' },
        { name: 'In Days', value: 'days' }
      ))

    .addStringOption(option => option
      .setName('reason')
      .setDescription('The reason for the mute.'))

  , async execute(interaction) {
    const user = interaction.options.getUser('user')
    const duration = interaction.options.getNumber('duration')
    const type = interaction.options.getString('type')
    const reason = interaction.options.getString('reason') ?? "No reason provided."

    const foundUser = await interaction.guild.members.cache.get(user.id)
    if (!foundUser)
      return interaction.reply("Could not find the specified user in the server.")

    if (foundUser.user.id === interaction.user.id)
      return interaction.reply('You cannot mute yourself!')

    let timeoutDuration = duration

    switch (type) {
      case "seconds":
        timeoutDuration *= 1_000
        break
      case "minutes":
        timeoutDuration *= 1_000 * 60
        break
      case "hours":
        timeoutDuration *= 1_000 * 60 * 60
        break
      default:
        timeoutDuration *= 1_000
        break
    }

    foundUser.timeout(timeoutDuration)
      .then(() => {
        
        interaction.reply({embeds: [createEmbed({
          title: `Successfully muted <@${foundUser.user.id}> for **${duration} ${type}**.`,
          desc: `Reason: \`${reason}\`.`,
          color: 'd5cc4d'
        })]})

        const channel = interaction.guild.channels.cache.get(modLogs)
        channel.send({
          embeds: [createEmbed({
            title: `${user.id} Muted`,
            desc: `<@${user.id}> has been muted by <@${interaction.user.id}> for **${duration} ${type}** with reason: \`${reason}\``
          })]
        })
        
        try {
          foundUser.createDM({force: true})
          foundUser.send({embeds: [createEmbed({
            title: 'Mute Message',
            desc: `You were muted in ${interaction.guild.name} for **${duration} ${type}**.\nReason: \`${reason}\`.`,
            color: 'd5cc4d'
          })]})
        } catch (e) {
          console.log(e)
        }
        
      }).catch(e => {
        console.log(e)
      })
  }
}