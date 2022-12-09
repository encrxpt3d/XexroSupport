const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panel')
    .setDescription('Creates a panel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

    .addStringOption(option => option
      .setName('panel_title')
      .setDescription('The title of the panel.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('panel_message')
      .setDescription('The message to show on the panel embed.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('button_text')
      .setDescription('The text to show on the panel button.')
      .setRequired(true))

    .addChannelOption(option => option
      .setName('channel')
      .setDescription('The channel to post the panel in.')
      .setRequired(true))

    .addStringOption(option => option
      .setName('button_type')
      .setDescription('The type of button to create.')
      .addChoices(
        { name: 'Primary Button', value: 'Primary' },
        { name: 'Secondary Button', value: 'Secondary' },
        { name: 'Success Button', value: 'Success' },
        { name: 'Danger Button', value: 'Danger' },
        { name: 'Link Button', value: 'Link' }
      )
      .setRequired(true))

    .addStringOption(option => option
      .setName('url')
      .setDescription('URL to set - only for link buttons.'))

  , async execute(interaction) {
    const panelTitle = interaction.options.getString('panel_title')
    const panelMessage = interaction.options.getString('panel_message')
    const buttonText = interaction.options.getString('button_text')
    const channel = interaction.options.getChannel('channel')
    const buttonType = interaction.options.getString('button_type')
    const url = interaction.options.getString('url')

    let row = null;

    if (buttonType == "Link") {
      row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(buttonText)
					.setStyle(ButtonStyle.Link)
          .setURL(url),
			);
    } else {
      row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(panelTitle)
					.setLabel(buttonText)
					.setStyle(ButtonStyle.Secondary),
			);
    }

    await channel.send({
      embeds: [createEmbed({
        title: panelTitle,
        desc: panelMessage
      })], components: [row]
    });

    interaction.reply({
      embeds: [createEmbed({
        title: 'Create Panel Success',
        desc: `The panel has been successfully created in <#${channel.id}>.`
      })], ephemeral: true
    })
  }
}

