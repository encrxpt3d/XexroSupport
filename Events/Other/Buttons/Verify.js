const { clientId, unverifiedRole, memberRole, selfRoles } = require("../../../config.json")

const wait = require('node:timers/promises').setTimeout;
const createEmbed = require("../../../Modules/embed").new

const get = function(i, currentChar) {
  let chr = null;
  switch (i) {
    case 1:
      chr = "**"
      break;
    case 2:
      chr = "__"
      break;
    case 3:
      chr = "*"
      break;
    case 4:
      chr = "__"
      break;
    case 5:
      chr = "**"
      break;
    default:
      break;
  }
  return chr;
}

const generate = function() {
  let uniqueChar = "";
  const randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i < 6; i++) {
    const gotChar = randomChar.charAt(Math.random() * randomChar.length)
    uniqueChar += get(i, uniqueChar)
    uniqueChar += gotChar
    uniqueChar += get(i, uniqueChar)
  }

  return uniqueChar;
}

module.exports = {
  async execute(interaction) {

    const member = interaction.guild.members.cache.get(interaction.user.id)
    if (member.roles.cache.get(memberRole)) {
      interaction.reply({
        fetchReply: true,
        content: 'You are already verified.',
        ephemeral: true
      })
      await wait(10000)
      interaction.deleteReply()
      return;
    }
    
    const dmChannel = await interaction.user.createDM({ force: true })
    const foundMessages = await dmChannel.messages.fetch({ limit: 1, cache: true }).then(msgs =>
      msgs.filter(msg =>
        msg.author.id == clientId && msg.content.match('session')))

    if (foundMessages.size > 0) {
      interaction.reply({
        fetchReply: true,
        content: 'You already have a verify session started.',
        ephemeral: true
      })
      await wait(10000)
      interaction.deleteReply()
    }
    else {
      await interaction.user.createDM({ force: true })

      const captcha = generate();

      const msg = await interaction.user.send({
        content: 'Successfully started session!',
        embeds: [createEmbed({
          title: `Please verify yourself to gain access to ${interaction.guild.name}`,
          desc: `Please send the captcha in this DM.\n\n**NOTE:** The captcha is CaSe SenSiTivE and does not include spaces.\n\nThe captcha will appear formatted. You must chat the plain text of the captcha without any formatting.\n\n**-------------------------------------**\n\n${captcha}`
        })],
        fetchReply: true
      })

      const filter = m => (m.author.id != clientId)

      msg.channel.awaitMessages({
        filter,
        max: 1,
        time: 45000,
        errors: ['time']
      }).then(async collected => {
        const received = collected.first().content

        if (received == captcha.replace(/[^a-zA-Z0-9]/g, "")) {
          member.roles.add(memberRole)
          member.roles.remove(unverifiedRole)
          msg.edit({
            content: null,
            embeds: [createEmbed({
              desc: `You have now been verified in **${interaction.guild.name}**!\n\n> Check out <#${selfRoles}> to get started!\n> **__YOU MUST GET THE GPO / MM PERMS TO ACCESS THOSE CHANNELS!!!__**`
            })]
          })
          await interaction.guild.channels.cache.get(selfRoles).send(`<@${member.id}>`).then(m => m.delete())
          return;
        } else {
          msg.edit({
            content: null,
            embeds: [createEmbed({
              desc: `The captcha given is incorrect.`
            })]
          })
          await wait(15000)
          msg.delete()
        }
      }
      ).catch(async () => {
        msg.edit({
          content: null,
          embeds: [createEmbed({
            desc: `**Prompt timed out.**`
          })]
        })
        await wait(15000)
        msg.delete()
      })

      interaction.reply({ ephemeral: true, fetchReply: true, content: 'This prompt will continue in your dms.' })
      await wait(10000)
      interaction.deleteReply()

      await wait(35000)
      try {
        msg.delete()
      } catch (e) {
        console.log(e)
      }
    }
  }
}