const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { modLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Choose dm options.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

    .addUserOption(option => option
      .setName('user')
      .setDescription('The user to target.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('type')
      .setDescription('DM the user or delete user + bot\'s DMs.')
      .setRequired(true)
      .addChoices(
        { name: 'DM User', value: 'dm' },
        { name: 'Delete Bot\'s DM', value: 'delete' },
      ))

    .addStringOption(option => option
      .setName('message')
      .setDescription('The message to send the user.'))
  ,
  async execute(interaction) {
    const user = interaction.options.getUser('user')
    const type = interaction.options.getString('type')
    const message = interaction.options.getString('message')

    const foundUser = await interaction.guild.members.cache.get(user.id)
    if (!foundUser)
      return interaction.reply("Could not find the specified user in the server.")

    if (type == 'dm')
      await foundUser.user.createDM().then(c => c.send(`**${interaction.user.tag}** says:\n\n${message}`)).then(() =>
        interaction.reply(`Successfully DM'ed ${user} \`${message}\`.`))
    else {
      await foundUser.user.createDM().then(async c => {
        await c.messages.fetch({cache: true}).then(msgs => msgs.forEach(msg => {
          msg.delete()
        })).then(() => interaction.reply(`Successfully deleted <@${user.id}>\'s DMs.`))
      })
    }
  }
}