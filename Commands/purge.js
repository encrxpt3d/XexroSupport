const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const createEmbed = require("../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Bulk deletes messages in a channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

    .addSubcommand(subcommand => subcommand
      .setName('channel')
      .setDescription('Channel to purge.')

      .addChannelOption(option => option
        .setName('target')
        .setDescription('Purges messages in this channel.')
        .setRequired(true))

      .addNumberOption(option => option
        .setName('messages')
        .setDescription('The amount of messages to purge.')
        .setRequired(true)))

    .addSubcommand(subcommand => subcommand
      .setName('user')
      .setDescription('User to purge (current channel).')

      .addUserOption(option => option
        .setName('target')
        .setDescription('Purges messages from this user.')
        .setRequired(true))

      .addNumberOption(option => option
        .setName('messages')
        .setDescription('The amount of messages to purge.')
        .setRequired(true)))

    .addSubcommand(subcommand => subcommand
      .setName('role')
      .setDescription('Purge messages from users with this role (current channel).')

      .addRoleOption(option => option
        .setName('target')
        .setDescription('Role to purge.')
        .setRequired(true))

      .addNumberOption(option => option
        .setName('messages')
        .setDescription('The amount of messages to purge.')
        .setRequired(true)))

  , async execute(interaction) {

    const messages = interaction.options.getNumber('messages')

    if (interaction.options.getSubcommand() === 'user') {

      const user = interaction.options.getUser('target');

      try {

        const userMessages = await interaction.channel.messages.fetch().then(msgs =>
          msgs.filter(m =>
            m.author.id == user.id))

        let count = messages

        await userMessages.forEach(m => {
          if (count > 0) {
            --count
            m.delete()
          }
        })

        if (count == messages) {
          interaction.reply({
            ephemeral: true,
            embeds: [createEmbed({
              desc: `**Could not purge messages from ${user}.**`
            })]
          })
        } else {
          interaction.reply({
            ephemeral: true,
            embeds: [createEmbed({
              desc: `**Successfully purged** \`${messages - count}\` **messages from ${user}!**`
            })]
          })
        }
      } catch (e) {
        console.log(e)
        interaction.reply({
          ephemeral: true,
          embeds: [createEmbed({
            desc: `**Failed to purge ${user}'s messages.**`
          })]
        })
      }
    }
    else if (interaction.options.getSubcommand() === 'role') {

      const role = interaction.options.getRole('target');

      try {

        const members = await interaction.guild.members.fetch().then(mbrs =>
          mbrs.filter(mbr =>
            mbr.roles.cache.has(role.id)))

        let count2 = 0

        await members.forEach(async mbr => {
          const userMessages = await interaction.channel.messages.fetch().then(msgs =>
            msgs.filter(m =>
              m.author.id == mbr.id))

          let count = messages

          await userMessages.forEach(m => {
            if (count > 0) {
              --count
              count2++
              m.delete()
            }
          })
        })

        interaction.reply({
          ephemeral: true,
          embeds: [createEmbed({
            desc: `**Successfully purged** \`${count2}\` **messages** (*total*) **for users with the role ${role}!**`
          })]
        })
      } catch (e) {
        console.log(e)
        interaction.reply({
          ephemeral: true,
          embeds: [createEmbed({
            desc: `Failed to purge messages from members with the role ${role}.`
          })]
        })
      }
    }
    if (interaction.options.getSubcommand() === 'channel') {
      const channel = interaction.options.getChannel('target')
      try {

        await channel.bulkDelete(messages, true)

        interaction.reply({
          ephemeral: true,
          embeds: [createEmbed({
            desc: `**Successfully purged** \`${messages}\` **messages in channel ${channel}!**`
          })]
        })
      } catch (e) {
        console.log(e)
        interaction.reply({
          ephemeral: true,
          embeds: [createEmbed({
            desc: `Failed to purge messages in channel ${channel}.`
          })]
        })
      }
    }
  }
}